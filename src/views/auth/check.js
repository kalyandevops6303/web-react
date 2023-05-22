import React, { Fragment, useState } from "react";
import "../../pages.scss";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/plugins/monthSelect/style.css";
import thumbnailGenerator from "@uppy/thumbnail-generator";
import { DragDrop } from "@uppy/react";
import Uppy from "@uppy/core";
import "uppy/dist/uppy.css";
import "@uppy/status-bar/dist/style.css";
import "@styles/react/libs/file-uploader/file-uploader.scss";
import {
  Badge,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { X } from "react-feather";
import {
  CloseIconContainer,
  ImageWithCloseContainer,
} from "../../styledComponents";
import { useDispatch, useSelector } from "react-redux";
import { createOfferApi } from "../../../redux/offers/actionCreator";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const CreateOfferModal = ({
  isModal,
  toggleModal,
  page,
  pageSize,
  activeTab,
}) => {
  const dispatch = useDispatch();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() + 1);
  defaultStartDate.setHours(0, 0, 0, 0);

  const [minEndDate, setMinEndDate] = useState(defaultStartDate);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadImageRes, setUploadImageRes] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { createOfferLoading } = useSelector((state) => {
    return {
      createOfferLoading: state.offers.createOfferLoading,
    };
  });

  const CreateOfferSchema = yup.object().shape({
    brandName: yup.string().required("Brand Name is required"),
    offerName: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    offerURL: yup.string().url("URL must be valid").required("URL is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date(),
    uploadKey: yup.string(),
  });

  const { register, errors, handleSubmit, control, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      startDate: defaultStartDate,
    },
    resolver: yupResolver(CreateOfferSchema),
  });

  const handleImageUpload = async (file) => {
    setIsImageUploading(true);
    setIsImageUploaded(false);
    const url = `${API_ENDPOINT}/api/membership-perks/offer-image?filename=${file.name}`;

    try {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        })
        .then((res) => {
          setUploadImageRes(res.data.data);
          setIsImageUploaded(true);
          setIsImageUploading(false);
        });
    } catch (error) {
      toast.error(error.response.data.errorData.message);
      setIsImageUploading(false);
    }
  };

  const uppy = new Uppy({
    meta: { type: "all" },
    autoProceed: true,
    restrictions: {
      allowedFileTypes: [".jpg", ".jpeg", ".png"],
      maxNumberOfFiles: 1,
      maxFileSize: 5 * 1024 * 1024,
    },
  });

  uppy.on("restriction-failed", (file, error) => {
    toast.error(error.message);
  });

  uppy.on("file-added", (file) => {
    handleImageUpload(file);
  });

  uppy.use(thumbnailGenerator);

  uppy.on("thumbnail:generated", (file, preview) => {
    setSelectedImage(file.data);
    setImagePreview(preview);
  });

  const onRemoveImageClick = () => {
    setSelectedImage(null);
    setIsImageUploaded(false);
    setUploadImageRes(null);
    uppy.reset();
  };

  const removeUndefinedValues = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const onSubmit = async (data) => {
    if (uploadImageRes) {
      setIsImageUploading(true);
      try {
        await axios({
          url: uploadImageRes.presignedURL,
          method: "PUT",
          headers: {
            "Content-Type": "image/*",
            "x-amz-acl": "public-read",
          },
          data: selectedImage,
        }).then((res) => {
          setIsImageUploading(false);
          let postData;
          if (data.endDate) {
            postData = {
              ...data,
              startDate: data.startDate.getTime(),
              endDate: data.endDate.setHours(23, 59, 59, 0),
              uploadKey: uploadImageRes.key,
            };

            dispatch(
              createOfferApi(postData, toggleModal, page, pageSize, activeTab)
            );
          } else {
            postData = {
              ...data,
              startDate: data.startDate.getTime(),
              uploadKey: uploadImageRes.key,
            };
            dispatch(
              createOfferApi(
                removeUndefinedValues(postData),
                toggleModal,
                page,
                pageSize,
                activeTab
              )
            );
          }
        });
      } catch (error) {
        setIsImageUploading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Please upload an image to continue!");
    }
  };

  return (
    <Fragment>
      <Modal
        isOpen={isModal}
        toggle={() => toggleModal()}
        className={"modal-dialog-centered modal-s"}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <div className="white-modal-header">
          <ModalHeader toggle={() => toggleModal()}></ModalHeader>
        </div>
        <ModalBody className="px-2">
          <h3 className="m-0">Create Offer</h3>
          <Form onSubmit={handleSubmit(onSubmit)} className="mt-1">
            <FormGroup>
              <Label for="brandName">Brand Name</Label>
              <Input
                type="text"
                id="brandName"
                name="brandName"
                innerRef={register({ required: true })}
                invalid={errors.brandName && true}
                placeholder="Enter brand name"
              />
              {errors && errors.brandName && (
                <FormFeedback>{errors.brandName.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="offerName">Offer Name</Label>
              <Input
                type="text"
                id="offerName"
                name="offerName"
                innerRef={register({ required: true })}
                invalid={errors.offerName && true}
                placeholder="Enter offer name"
              />
              {errors && errors.offerName && (
                <FormFeedback>{errors.offerName.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                innerRef={register({ required: true })}
                invalid={errors.description && true}
                placeholder="Enter description"
              />
              {errors && errors.description && (
                <FormFeedback>{errors.description.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="offerURL">Add URL</Label>
              <Input
                type="text"
                id="offerURL"
                name="offerURL"
                innerRef={register({ required: true })}
                invalid={errors.offerURL && true}
                placeholder="URL link to be redirected"
              />
              {errors && errors.offerURL && (
                <FormFeedback>{errors.offerURL.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="uploadKey">Upload Image</Label>
              {isImageUploaded ? (
                <ImageWithCloseContainer>
                  <CloseIconContainer>
                    <Badge
                      pill
                      color="danger"
                      className="badge-up"
                      onClick={onRemoveImageClick}
                    >
                      <X size={20} />
                    </Badge>
                  </CloseIconContainer>
                  <img
                    src={imagePreview}
                    alt="image"
                    width={250}
                    height={200}
                    className="rounded mt-1"
                  />
                </ImageWithCloseContainer>
              ) : (
                <>
                  {isImageUploading ? (
                    <div className="p-5 d-flex justify-content-center align-items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      <Controller
                        control={control}
                        id="uploadKey"
                        name="uploadKey"
                        innerRef={register({ required: true })}
                        invalid={errors.uploadKey && true}
                        className={classNames(
                          "form-control bg-white text-dark",
                          {
                            "is-invalid": errors && errors.uploadKey,
                          }
                        )}
                        render={({ field }) => (
                          <DragDrop
                            uppy={uppy}
                            width="100%"
                            height="200px"
                            note=""
                            locale={{
                              strings: {
                                dropHereOr:
                                  "Drop files here or browse to upload",
                                browse: "browse",
                              },
                            }}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.uploadKey && (
                        <FormFeedback className="mt-3 mb-3">
                          {errors.uploadKey.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                </>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Controller
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control bg-white text-dark flatpickr-input"
                    options={{
                      minDate: "today",
                      dateFormat: "d-m-Y",
                      defaultDate: defaultStartDate,
                      onChange: (date) => {
                        setMinEndDate(date[0]);
                        setValue("startDate", date[0]);
                        setValue("endDate", undefined);
                      },
                    }}
                  />
                )}
                innerRef={register({ required: true })}
                invalid={errors.startDate && true}
                id="startDate"
                name="startDate"
                className={classNames("form-control bg-white text-dark", {
                  "is-invalid": errors && errors.startDate,
                })}
                placeholder="Select start date"
              />
              {errors && errors.startDate && (
                <FormFeedback>{errors.startDate.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date (optional)</Label>
              <Controller
                as={Flatpickr}
                control={control}
                innerRef={register({ required: true })}
                invalid={errors.endDate && true}
                options={{
                  minDate: minEndDate,
                  dateFormat: "d-m-Y",
                }}
                id="endDate"
                name="endDate"
                className={classNames("form-control bg-white text-dark", {
                  "is-invalid": errors && errors.endDate,
                })}
                placeholder="Select end date"
              />
              {errors && errors.endDate && (
                <FormFeedback>{errors.endDate.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Row className="d-flex justify-content-center mt-2 px-1">
                <Button.Ripple
                  block
                  color=""
                  className="round px-5 mb-1"
                  style={{ backgroundColor: "#FADF18", color: "#000000" }}
                  type="submit"
                  disabled={isImageUploading || createOfferLoading}
                >
                  Post Offer
                </Button.Ripple>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CreateOfferModal;
