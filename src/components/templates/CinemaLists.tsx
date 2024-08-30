import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the import path as necessary
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Import the Dialog component
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Edit2, Trash } from "lucide-react";

interface Screen {
  screenno: number;
  projectionType: string;
  soundSystemType: string;
  rows: number;
  columns: number;
  price: number;
  _id: string;
}

interface Cinema {
  _id: string;
  name: string;
  Address: string;
  screens: Screen[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CinemaLists = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedScreens, setSelectedScreens] = useState<Screen[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(2); // Items per page

  useEffect(() => {
    const fetchCinemas = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Cinema[]>(
          "https://bookmyshowfinal.onrender.com/api/cinema/cinema"
        );
        setCinemas(response.data);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
        setError("Failed to fetch cinema data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const handleScreenCountClick = (screens: Screen[]) => {
    setSelectedScreens(screens);
    setIsDialogOpen(true);
  };
  // Filter cinemas based on the search query
  const filteredCinemas = cinemas.filter((cinema) =>
    cinema.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the current cinemas to display based on pagination
  const indexOfLastCinema = currentPage * itemsPerPage;
  const indexOfFirstCinema = indexOfLastCinema - itemsPerPage;
  const currentCinemas = filteredCinemas.slice(
    indexOfFirstCinema,
    indexOfLastCinema
  );
  // Calculate total pages
  const totalPages = Math.ceil(filteredCinemas.length / itemsPerPage);
  if (loading) {
    return (
      <div>
        <Table>
          <TableCaption>A list of cinemas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cinema Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Screen Count</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-1/2 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-1/3 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-1/4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-1/4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-1/4 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by Cinema Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Table>
        <TableCaption>A list of cinemas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cinema Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Screen Count</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>More Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCinemas.map((cinema) => (
            <TableRow key={cinema._id}>
              <TableCell className="font-medium">{cinema.name}</TableCell>
              <TableCell>{cinema.Address}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleScreenCountClick(cinema.screens)}
                  className="text-blue-500 underline"
                >
                  <Dialog>
                    <DialogTrigger> {cinema.screens.length}</DialogTrigger>
                    <DialogContent className="">
                      {selectedScreens.length > 0 ? (
                        <Table className="py-10 px-4 ">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Screen No</TableHead>
                              <TableHead>Projection Type</TableHead>
                              <TableHead>Sound System Type</TableHead>
                              <TableHead>Rows</TableHead>
                              <TableHead>Columns</TableHead>
                              <TableHead>Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedScreens.map((screen) => (
                              <TableRow key={screen._id}>
                                <TableCell>{screen.screenno}</TableCell>
                                <TableCell>
                                  {screen.projectionType || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {screen.soundSystemType || "N/A"}
                                </TableCell>
                                <TableCell>{screen.rows}</TableCell>
                                <TableCell>{screen.columns}</TableCell>
                                <TableCell>{screen.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div>No screens available.</div>
                      )}
                    </DialogContent>
                  </Dialog>
                </button>
              </TableCell>
              <TableCell>
                {new Date(cinema.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(cinema.updatedAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-1 ">
                  <Edit2 className="w-5 h-5" /> <span />
                  <Trash className="w-5 h-5" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {/* <Pagination>
        <PaginationPrevious
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </PaginationItem>
        ))}
        <PaginationNext
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      </Pagination> */}

      {/* Dialog for displaying screen details */}
    </div>
  );
};

export default CinemaLists;
