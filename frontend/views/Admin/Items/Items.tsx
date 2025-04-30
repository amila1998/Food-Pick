"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import Table from "@/components/Table/Table";
import Toast from "@/components/Toast/Toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EDIT_ICON, LEFT_ARROW, RIGHT_ARROW, VIEW_ICON } from "@/utils/icons";
import Modal from "@/components/Modal/Modal";
import getCurrency from "@/utils/getCurrencey";
import ImageDropzone from "@/components/ImageDropzone/ImageDropzone";
import TextArea from "@/components/TextArea/TextArea";
import { createItem, getAllItemsOwn, updateItem, upload } from "@/actions/item";

interface Item {
  _id: number | 0;
  name: string;
  description: string;
  price: number | 0;
  image: string;
  avalable:boolean;
}

const ItemManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);
  const [isOpenItemModal, setIsOpenItemModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [callback, setCallback] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>({
    _id: 0,
    name: "",
    description: "",
    price: 0,
    image: "https://res.cloudinary.com/amiladevin1998/image/upload/v1745921295/items/uthpw64sbrbxwjwue6ct.jpg",
    avalable:true
  });
  const [errors, setErrors] = useState<any>({
    name: "",
    description: "",
    price: "",
    image:"",
    avalable:""
  });

  const [searchParams, setSearchParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setCallback(true);
  }, []);

  useEffect(() => {
    if (isClient && callback) {
      getItems();
    }
  }, [isClient, callback]);

  const getItems = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(getAllItemsOwn())
      setItems(res)
    } catch (error: any) {
      toast.error(error);
    } finally {
      setCallback(false);
      setIsLoading(false);
    }
  };

  const createNewItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!item.name) {
        setErrors((prev:any) => ({ ...prev, name: "Name is required" }));
        return;
      }else{
        setErrors((prev:any) => ({ ...prev, name: "" }));
      }
      if(!item.description) {
        setErrors((prev:any) => ({ ...prev, description: "Description is required" }));
        return;
      }else{
        setErrors((prev:any) => ({ ...prev, description: "" }));
      }
      if(!item.price) {
        setErrors((prev:any) => ({ ...prev, price: "Price is required" }));
        return;
      }else{
        setErrors((prev:any) => ({ ...prev, price: "" }));
      }
      setIsLoading(true);
      await dispatch(createItem(item))
      setCallback(true);
      onCloseItemModal();
      toast.success("Item created successfully")
    } catch (error:any) {
      toast.error(error);
    }finally{
      setIsLoading(true);

    }
  };

  const editItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!item._id && item._id === 0) {
        toast.error("Item id is required")
        return;
      }
      if(!item.name) {
        setErrors((prev:any) => ({ ...prev, name: "Name is required" }));
        return;
      }else{
        setErrors((prev:any) => ({ ...prev, name: "" }));
      }
      if(!item.description) {
        setErrors((prev:any) => ({ ...prev, description: "Description is required" }));
        return;
      }else{
        setErrors((prev:any) => ({ ...prev, description: "" }));
      }
      if(!item.price) {
        setErrors((prev:any) => ({ ...prev, price: "Price is required" }));
        return;
      }else{
        setErrors((prev:any) => ({ ...prev, price: "" }));
      }
      setIsLoading(true);
      await dispatch(updateItem(item))
      setCallback(true);
      onCloseItemModal();
      toast.success("Item updated successfully")
    } catch (error:any) {
      toast.error(error);
    }finally{
      setIsLoading(true);

    }
  };

  const handleOnClickCreatNewItem = () => {
    setItem({
      _id: 0,
      name: "",
      description: "",
      price: 0,
      image: "https://res.cloudinary.com/amiladevin1998/image/upload/v1745921295/items/uthpw64sbrbxwjwue6ct.jpg",
      avalable:true
    });
    setIsViewMode(false);
    setIsOpenItemModal(true);
    setCallback(false);
  };

  const onCloseItemModal = () => {
    setIsOpenItemModal(false);
    setItem({
      _id: 0,
      name: "",
      description: "",
      price: 0,
      image: "https://res.cloudinary.com/amiladevin1998/image/upload/v1745921295/items/uthpw64sbrbxwjwue6ct.jpg",
      avalable:true
    });
    setIsViewMode(false);
    setIsEditMode(false);
    setErrors({
      name: "",
      description: "",
      price: "",
      image:"",
      avalable:""
    });
  };

  const handleImageUpload = async(file: File) => { 
    try {
      const res = await dispatch(upload(file));
    } catch (error: any) {
      toast.error(error);
      
    }
  }

  return (
    <>
      {(!isClient || isLoading) && <Loader />}
      <Toast />
      <Modal
        isViewMode={isViewMode}
        isOpen={isOpenItemModal}
        onClose={onCloseItemModal}
        onSubmit={() =>
          isEditMode
            ? editItem(
                new Event(
                  "submit",
                ) as unknown as React.FormEvent<HTMLFormElement>,
              )
            : createNewItem(
                new Event(
                  "submit",
                ) as unknown as React.FormEvent<HTMLFormElement>,
              )
        }
        title={
          isViewMode ? "View Item" : isEditMode ? "Edit Item" : "Create Item"
        }
        width="md"
        submitLabel={isEditMode ? "Update" : "Create"}
      >
        <div className="max-h-[65vh] overflow-auto p-2">
        {/* <div className="mb-4">
            <ImageDropzone error={errors.thumbnail_url} previewUrl={item.thumbnail_url} label="Photo *" onFileAccepted={function (file: File): void {
               handleImageUpload(file)             
            }} />
          </div> */}
          <div className="mb-4">
            <Input
              error={errors.name}
              label="Name"
              onChange={(e) => {
                setItem((prev) => ({ ...prev, name: e.target.value }));
              }}
              id={"item_name"}
              name={"item_name"}
              type={"text"}
              value={item.name}
              isRequired={true}
            />
          </div>
          <div className="mb-4">
            <Input
              label={`Price (${getCurrency("en-US", "LKR")})`}
              onChange={(e) => {
                setItem((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value) || 0,
                }));
              }}
              id={"item_price"}
              name={"item_price"}
              type={"number"}
              value={item?.price ? item.price : 0}
              isRequired={true}
              error={errors.price}
            />
          </div>
          <div className="mb-4">
            <TextArea
              error={errors.description}
              label="Description"
              onChange={(e) => {
                setItem((prev) => ({ ...prev, description: e.target.value }));
              }}
              id={"item_description"}
              name={"item_description"}
              value={item.description}
              isRequired={true}
            />
          </div>
        </div>
      </Modal>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-wrap justify-between">
          <div className="flex w-2/5 justify-start">
            <h2 className="text-left text-2xl font-bold">Item Management</h2>
          </div>
          <div className="flex w-3/5 justify-end">
            <Button
              type="filled"
              color="primary"
              onClick={() => handleOnClickCreatNewItem()}
              label="New Item"
            />
          </div>
        </div>

        <div className="mt-2 max-h-[52vh] min-h-[52vh] w-full overflow-auto  p-2">
          <div className="mb-2 flex w-full items-center justify-between">
            <Input
              label="Search"
              placeholder="Search by name"
              type="text"
              onChange={(e) => {
                setSearchParams(e.target.value);
              }}
              id={"role_search"}
              name={"role_search"}
              value={searchParams}
            />
          </div>
          <Table
            total={totalCount}
            title={
              <>
                <div className="text-[10px]">Total Items : {items.length}</div>
              </>
            }
            columns={[
              { key: "_id", label: "#" },
              { key: "name", label: "Name" },
            ]}
            data={items}
            actions={[
              {
                label: "View",
                icon: <FontAwesomeIcon icon={VIEW_ICON} />,
                onClick: (row) => {
                  setItem(row);
                  setIsViewMode(true);
                  setIsOpenItemModal(true);
                },
              },
              {
                label: "Edit",
                icon: <FontAwesomeIcon icon={EDIT_ICON} />,
                onClick: (row) => {
                  setItem(row);
                  setIsViewMode(false);
                  setIsOpenItemModal(true);
                  setIsEditMode(true);
                },
              },
            ]}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={(p) => {
              setCurrentPage(p);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ItemManagementPage;
