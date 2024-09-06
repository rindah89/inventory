'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { UploadButton } from "../ui/uploadbutton";

export default function NewAdjustmentFormClient({ accounts, reasons }) {
  const { register, handleSubmit, watch } = useForm();
  const adjustmentMode = watch('adjustmentMode', 'quantity');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/adjustments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Submission failed');
      // Handle successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>New Adjustment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <RadioGroup defaultValue="quantity" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quantity" id="quantity" {...register('adjustmentMode')} />
                <Label htmlFor="quantity">Quantity Adjustment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="value" id="value" {...register('adjustmentMode')} />
                <Label htmlFor="value">Value Adjustment</Label>
              </div>
            </RadioGroup>

            <Input placeholder="Reference Number" {...register('referenceNumber')} />

            <Input type="date" {...register('date')} required />

            <Select {...register('account')} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    [ {account.id} ] {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select {...register('reason')} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((reason) => (
                  <SelectItem key={reason.id} value={reason.id}>{reason.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea placeholder="Description (Max. 500 characters)" {...register('description')} maxLength={500} />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ITEM DETAILS</TableHead>
                  <TableHead>QUANTITY AVAILABLE</TableHead>
                  <TableHead>NEW QUANTITY ON HAND</TableHead>
                  <TableHead>QUANTITY ADJUSTED</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input placeholder="Type or click to select an item" {...register('itemDetails')} />
                  </TableCell>
                  <TableCell>0.00</TableCell>
                  <TableCell>
                    <Input type="number" placeholder="Eg. +10, -10" {...register('newQuantity')} />
                  </TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">×</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div>
              <Label>Attach File(s) to inventory adjustment</Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <p className="text-sm text-gray-500 mt-1">You can upload a maximum of 5 files, 5MB each</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit">Save as Draft</Button>
            <Button type="button">Convert to Adjusted</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}