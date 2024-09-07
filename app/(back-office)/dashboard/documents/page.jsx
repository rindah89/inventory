import React from 'react';
import { Button } from "../../../../components/ui/button"
import { Select } from "../../../../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { Checkbox } from "../../../../components/ui/checkbox"
import { FileIcon, MoreVertical, Upload } from 'lucide-react';

const FileStatus = ({ status }) => {
  const statusStyles = {
    Unreadable: "bg-orange-100 text-orange-800",
    Processed: "bg-green-100 text-green-800",
    "Scan in progress": "bg-blue-100 text-blue-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const FilesDashboard = () => {
  const files = [
    { name: "image2.jpg", details: "", uploadedBy: "Otto", uploadedOn: "28 Oct 2023", status: "Unreadable" },
    { name: "image3.png", details: "$undefined\nVendor: laboriosam\nDate: 10 Apr 2024\nRef #: 39882", uploadedBy: "Bret", uploadedOn: "28 Oct 2023", status: "Processed" },
    { name: "image4.png", details: "", uploadedBy: "Harmony", uploadedOn: "28 Oct 2023", status: "Unreadable" },
    { name: "image2.jpg", details: "", uploadedBy: "Hildegard", uploadedOn: "28 Oct 2023", status: "Unreadable" },
    { name: "image4.png", details: "", uploadedBy: "Hilbert", uploadedOn: "28 Oct 2023", status: "Scan in progress" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Files</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Configure</Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Select>
          <option>Filter By : Status : All</option>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>FILE NAME</TableHead>
            <TableHead>DETAILS</TableHead>
            <TableHead>UPLOADED BY</TableHead>
            <TableHead>UPLOADED ON</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <FileIcon className="mr-2 h-4 w-4 text-blue-500" />
                  {file.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="whitespace-pre-line">{file.details}</div>
                <FileStatus status={file.status} />
              </TableCell>
              <TableCell>{file.uploadedBy}</TableCell>
              <TableCell>{file.uploadedOn}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FilesDashboard;