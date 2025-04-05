import React, { useEffect, useRef, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { Button, PageButton } from "./shared/Button";
import { classNames } from "./shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./shared/Icons";
import FilledBtn from "../buttons/FilledBtn";
import Modal from "../Modal";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import {
  useListLocationMutation,
  useListPlacesMutation,
} from "../../store/services/mainApi";
import { useNavigate } from "react-router-dom";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  gofunc,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const navigate = useNavigate();
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="relative w-full flex gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-default left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
          //setSearchTerm(e.target.value)
        }}
        placeholder={`${count} records...`}
        className="w-full py-3 pl-12 pr-4 text-default border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-lightkozy placeholder-lightkozy"
      />
      {gofunc && (
        <p
          className=" flex justify-center items-center px-3  rounded-lg text-center text-white bg-lightkozy w-40 cursor-pointer"
          onClick={() => navigate(`${gofunc.url}`)}
        >
          {gofunc.title}
        </p>
      )}
    </div>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline ">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }) {
  const status = value != null ? value.toString() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status === "1" ? "bg-green-100 text-green-800" : null,
        status === "0" ? "bg-red-100 text-red-800" : null
      )}
    >
      {status === "1" ? "Active" : "Pasif"}
    </span>
  );
}
export function VisitorStatusCard({ value }) {
  const status = value != null ? value.toString() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status === "available" ? "bg-green-100 text-green-800" : null,
        status === "assigned" ? "bg-red-100 text-red-800" : null,
        status === "passive" ? "bg-slate-300 text-slate-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function ConnectedPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  const statusClasses = {
    connect: "bg-green-100 text-green-800",
    disconnect: "bg-red-100 text-red-800",
    room_changed: "bg-yellow-100 text-yellow-800",
    heartbeat: "bg-blue-100 text-blue-800",
    added: "bg-purple-100 text-purple-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  const statusText = {
    connect: "Connected",
    disconnect: "Disconnected",
    room_change: "Room Change",
    heartbeat: "Heartbeat",
    added: "Added",
    unknown: "Unknown",
  };

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        statusClasses[status] || statusClasses["unknown"]
      )}
    >
      {statusText[status] || statusText["unknown"]}
    </span>
  );
}

export function ViewOnGoogleMap({ row, setViewGoogleMap, setCoordinates }) {
  const handleClick = () => {
    setViewGoogleMap(true);
    setCoordinates({ lat: row.original.lat, lng: row.original.lng });
  };
  return (
    <div>
      <Button onClick={handleClick}>View on Maps</Button>
    </div>
  );
}
// export function ViewOnMap({
//   row,
//   user,
//   setSketch,
//   setIsMapView,
//   setViewMap,
//   setViewRoom,
// }) {
//   const [openModal, setOpenModal] = useState(false);
//   const [getPlaceId, { data: isPlaceId, isLoading: isLoadingId }] =
//     useListPlacesMutation();
//   const [getRoom, { data: isRoom, isLoading: isRoomLoading }] =
//     useListLocationMutation();

//   const handleViewOnMap = async (row) => {
//     console.log(row.original);

//     const isPlaceResponse = await getPlaceId({
//       plant_id: row.original.plant_id,
//     }).unwrap();
//     console.log(isPlaceResponse.ret[0].image_url, "cevap");
//     setSketch(isPlaceResponse.ret[0].image_url);

//     try {
//       const isRoomResponse = await getRoom({
//         institution_id: row.original.institution_id,
//         location_type: "room",
//       }).unwrap();

//       const filteredRooms = isRoomResponse.ret.filter(
//         (item) => item.place_id == +row.original.id
//       );
//       if (filteredRooms.length > 0) {
//         console.log("URDAYIM");
//         setViewRoom(filteredRooms);
//         setViewMap(true);
//         setIsMapView(true);
//       }
//     } catch (error) {
//       console.error("Error fetching room data", error);
//     }
//   };

//   return (
//     <div>
//       <Button onClick={() => handleViewOnMap(row)}>View on Maps</Button>
//     </div>
//   );
// }

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}

function Table({
  columns,
  data = [],
  title,
  func,
  gofunc = null,
  globalFilter = true,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    input,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    let isDragging = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDragging = true;
      scrollContainer.classList.add("dragging");
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Hız ayarı
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const onMouseUpOrLeave = () => {
      isDragging = false;
      scrollContainer.classList.remove("dragging");
    };

    scrollContainer.addEventListener("mousedown", onMouseDown);
    scrollContainer.addEventListener("mousemove", onMouseMove);
    scrollContainer.addEventListener("mouseup", onMouseUpOrLeave);
    scrollContainer.addEventListener("mouseleave", onMouseUpOrLeave);

    return () => {
      scrollContainer.removeEventListener("mousedown", onMouseDown);
      scrollContainer.removeEventListener("mousemove", onMouseMove);
      scrollContainer.removeEventListener("mouseup", onMouseUpOrLeave);
      scrollContainer.removeEventListener("mouseleave", onMouseUpOrLeave);
    };
  }, []);
  return (
    <>
      <div className="w-full  flex  justify-between ">
        <div className="flex flex-col md:flex-row w-[360px]  shadow-sm bg-gray-50 rounded-[8px] md:gap-8  md:ml-0 ">
          {globalFilter && (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              gofunc={gofunc}
            />
          )}
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div className="mt-4 md:mt-0 py-2 w-full " key={column.id}>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
        {title && <FilledBtn title={title} func={func} />}
      </div>
      <div className="mt-4 flex flex-col">
        <div
          className=" overflow-x-auto swiper-scrollbar scroll-smooth cursor-grab"
          ref={scrollContainerRef}
        >
          <div className="py-2 align-middle inline-block min-w-full  ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-lightkozy">
                  {headerGroups.map((headerGroup, index) => {
                    // `key` prop'unu headerGroup'dan ayıkla
                    const { key: headerGroupKey, ...restProps } =
                      headerGroup.getHeaderGroupProps();

                    return (
                      <tr key={headerGroupKey || index} {...restProps}>
                        {headerGroup.headers.map((column, index) => {
                          // `key` prop'unu column'dan ayıkla
                          const { key: columnKey, ...columnProps } =
                            column.getHeaderProps(
                              column.getSortByToggleProps()
                            );

                          return (
                            <th
                              key={columnKey || index} // `key`'i doğrudan ekle
                              scope="col"
                              className="group px-6 py-3 text-left text-xs font-medium text-darkkozy uppercase tracking-wider bg-gray-200"
                              {...columnProps} // Geri kalan props'ları spread yap
                            >
                              <div className="flex items-center justify-between">
                                {column.render("Header")}
                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <SortDownIcon className="w-4 h-4 text-default" />
                                    ) : (
                                      <SortUpIcon className="w-4 h-4 text-default" />
                                    )
                                  ) : (
                                    <SortIcon className="w-4 h-4 text-default opacity-0 group-hover:opacity-100" />
                                  )}
                                </span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>

                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-4 whitespace-nowrap  text-lightkozy"
                      >
                        No data available in table..
                      </td>
                    </tr>
                  ) : (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        const { key: rowKey, ...rowProps } = row.getRowProps();
                        return (
                          <tr
                            key={rowKey || i} // `key`'i doğrudan ekle, yoksa `i` kullan
                            {...rowProps} // Geri kalan props'ları spread yap
                            className={`${
                              i % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
                            } border `}
                          >
                            {row.cells.map((cell, cellIndex) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  key={cellIndex}
                                  className="px-6 py-4 whitespace-nowrap"
                                  role="cell"
                                >
                                  {cell.column.Cell.name ===
                                  "defaultRenderer" ? (
                                    <div className="text-xs text-default font-medium">
                                      {cell.render("Cell")}
                                    </div>
                                  ) : (
                                    cell.render("Cell")
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <div className="py-3 flex flex-col items-center justify-between">
          <div className="flex-1 flex justify-between md:hidden">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>
          </div>
          <div className="hidden md:flex  w-full items-center justify-between">
            <div className="flex gap-x-2 items-baseline">
              <span className="text-sm text-lightkozy">
                Page <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <label>
                <span className="sr-only">Items Per Page</span>
                <select
                  className="mt-1  w-full rounded-md border-gray-300 shadow-sm px-4 py-1 flex justify-start focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lightkozy"
                  value={state.pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px gap-2"
                aria-label="Pagination"
              >
                <PageButton
                  className="rounded-l-md  border border-lightkozy"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">First</span>
                  <ChevronDoubleLeftIcon
                    className="h-5 w-5 text-lightkozy  "
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  className="border border-lightkozy"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    className="h-5 w-5 text-lightkozy"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  className="border border-lightkozy"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    className="h-5 w-5 text-lightkozy"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  className="rounded-r-md border border-lightkozy"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Last</span>
                  <ChevronDoubleRightIcon
                    className="h-5 w-5 text-lightkozy "
                    aria-hidden="true"
                  />
                </PageButton>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
