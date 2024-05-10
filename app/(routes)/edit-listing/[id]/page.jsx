"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Formik } from "formik";

const EditListing = () => {
  return (
    <div className="w-full px-10">
      <h1 className="text-3xl font-bold text-primary my-1 text-center uppercase underline">
        Edit Listing
      </h1>

      <div className=" items-center flex flex-col justify-center relative">
        <Tabs
          defaultValue="land"
          className="w-[400px] md:w-[768px] lg:w-[800px] xl:w-[1200px] absolute top-16"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="land">Land</TabsTrigger>
            <TabsTrigger value="house">House</TabsTrigger>
          </TabsList>
          <TabsContent value="land">
            <Card>
              <CardHeader>
                <CardTitle>Land</CardTitle>
                <CardDescription>
                  Add More details to the Land Listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Land */}
                <div>
                  <Formik
                    initialValues={{
                      title: "",
                      type: "",
                      propertyType: "",
                      description: "",
                      price: "",
                      bedrooms: "",
                      bathrooms: "",
                      parking: "",
                      houseSize: "",
                      areaSize: ""
                    }}
                    validate={values => {
                      const errors = {};
                      if (!values.title) {
                        errors.title = 'Enter Title';
                      }else{
                        errors.title = ''
                      }
                      return errors;
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="">
                              <h2 className="text-md font-semibold">
                                Rent or Sell
                              </h2>
                              <RadioGroup
                                onValueChange={(v) => (values.type = v)}
                                className="my-3"
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <RadioGroupItem
                                    value="for-sell"
                                    id="for-sell"
                                  />
                                  <Label htmlFor="for-sell">For Sell</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="for-rent"
                                    id="for-rent"
                                  />
                                  <Label htmlFor="for-rent">For Rent</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <h2 className="text-md mb-3 font-semibold">
                                Property Type
                              </h2>
                              <Select
                                name="propertyType"
                                onValueChange={(e) => (values.propertyType = e)}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Completed House">
                                    Completed House
                                  </SelectItem>
                                  <SelectItem value="Uncompleted House">
                                    Uncompleted House
                                  </SelectItem>
                                  <SelectItem value="Family House">
                                    Family House
                                  </SelectItem>
                                  <SelectItem value="Compound House">
                                    Compound House
                                  </SelectItem>
                                  <SelectItem value="Land">Land</SelectItem>
                                  <SelectItem value="Store">Store</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Title
                              </h2>
                              <Input
                                placeholder="Title"
                                name="title"
                                type="text"
                                onChange={handleChange}
                              />
                              <small className="text-red-800">{errors.title && touched.title && errors.title}</small>
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Bed Rooms
                              </h2>
                              <Input
                                placeholder="Number of Bedrooms"
                                name="bedrooms"
                                type="number"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Bathrooms
                              </h2>
                              <Input
                                placeholder="Number of Bathrooms"
                                name="bathroom"
                                type="number"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Parking
                              </h2>
                              <Input
                                placeholder="Parking Places"
                                name="parking"
                                type="number"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                House Size
                              </h2>
                              <Input
                                placeholder="Sq.ft"
                                name="houseSize"
                                type="text"
                                onChange={handleChange}
                              />
                            </div>

                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Area (Sq.ft){" "}
                              </h2>
                              <Input
                                placeholder="Ex.1900 Sq.ft"
                                name="areaSize"
                                type="text"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Price (GHS)
                              </h2>
                              <Input
                                placeholder="40000"
                                name="price"
                                type="number"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mt-6">
                            <h2 className="text-gray-900 font-semibold mb-4">
                              Description
                            </h2>
                            <Textarea
                              placeholder="Description of the property"
                              name="description"
                              onChange={handleChange}
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-center md:justify-end lg:justify-end gap-6 mt-5">
                              <button type="submit" className="text-primary border py-2 px-8 rounded-md shadow-md">
                                Save
                              </button>
                              <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md shadow-md">
                                Save & Publish
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="house">
            <Card>
              <CardHeader>
                <CardTitle>House</CardTitle>
                <CardDescription>
                  Add more details to the House Listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* House */}
                <div>
                  <Formik
                    initialValues={{
                      title: "",
                      description: "",
                      price: "",
                      bedrooms: "",
                      bathroom: "",
                      garages: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit: handleFormSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleFormSubmit}>
                        <div className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="">
                              <h2 className="text-md font-semibold">
                                Rent or Sell
                              </h2>
                              <RadioGroup
                                className="my-3"
                                defaultValue="for-sell"
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <RadioGroupItem
                                    value="for-sell"
                                    id="for-sell"
                                  />
                                  <Label htmlFor="for-sell">For Sell</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="for-rent"
                                    id="for-rent"
                                  />
                                  <Label htmlFor="for-rent">For Rent</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <h2 className="text-md mb-3 font-semibold">
                                Property Type
                              </h2>
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Completed House">
                                    Completed House
                                  </SelectItem>
                                  <SelectItem value="Uncompleted House">
                                    Uncompleted House
                                  </SelectItem>
                                  <SelectItem value="Family House">
                                    Family House
                                  </SelectItem>
                                  <SelectItem value="Compound House">
                                    Compound House
                                  </SelectItem>
                                  <SelectItem value="Land">Land</SelectItem>
                                  <SelectItem value="Store">Store</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Title
                              </h2>
                              <Input
                                placeholder="Title"
                                name="title"
                                type="text"
                              />
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Bed Rooms
                              </h2>
                              <Input
                                placeholder="Number of Bedrooms"
                                name="bathroom"
                                type="number"
                              />
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Bathrooms
                              </h2>
                              <Input
                                placeholder="Number of Bathrooms"
                                name="bathroom"
                                type="number"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Parking
                              </h2>
                              <Input
                                placeholder="Parking"
                                name="parking"
                                type="number"
                              />
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Lot Size
                              </h2>
                              <Input
                                placeholder="Sq.ft"
                                name="lotsize"
                                type="number"
                              />
                            </div>

                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Area (Sq.ft){" "}
                              </h2>
                              <Input
                                placeholder="Ex.1900 Sq.ft"
                                name="builtIn"
                                type="number"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Selling price (GHS)
                              </h2>
                              <Input
                                placeholder="40000"
                                name="parking"
                                type="number"
                              />
                            </div>
                            <div className="flex gap-2 flex-col">
                              <h2 className="text-gray-900 font-semibold">
                                Per Month (GHS)
                              </h2>
                              <Input
                                placeholder="Duration per month"
                                name="permonth"
                                type="number"
                              />
                            </div>
                          </div>

                          <div className="mt-6">
                            <h2 className="text-gray-900 font-semibold mb-4">
                              Description
                            </h2>
                            <Textarea placeholder="Description of the property" />
                          </div>

                          <div>
                            <div className="flex items-center justify-center md:justify-end lg:justify-end gap-6 mt-5">
                              <button className="text-primary border py-2 px-8 rounded-md shadow-md">
                                Save
                              </button>
                              <button className="bg-primary text-white py-2 px-4 rounded-md shadow-md">
                                Save & Publish
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditListing;
