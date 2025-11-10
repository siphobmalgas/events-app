import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../contexts/event";
import venuesData from "../data/venues.json";
import "./AddEvent.css";

const EventSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Event name must be at least 2 characters")
    .required("Event name is required"),
  date: Yup.date()
    .min(new Date(), "Event date cannot be in the past")
    .required("Event date is required"),
  time: Yup.string().required("Event time is required"),
  duration: Yup.string()
    .oneOf(["1h", "2h", "5h", "8h", "1d", "custom"], "Invalid duration")
    .required("Duration is required"),
  customDurationValue: Yup.number().when("duration", {
    is: "custom",
    then: (schema) =>
      schema
        .typeError("Enter a number")
        .positive("Must be greater than 0")
        .required("Enter a duration"),
    otherwise: (schema) => schema.notRequired(),
  }),
  customDurationUnit: Yup.string().when("duration", {
    is: "custom",
    then: (schema) => schema.oneOf(["hours", "days"]).required("Select unit"),
    otherwise: (schema) => schema.notRequired(),
  }),
  location: Yup.string().required("Location is required"),
  customLocation: Yup.string().when("location", {
    is: "Custom Location",
    then: (schema) =>
      schema
        .min(2, "Custom location must be at least 2 characters")
        .required("Please enter a custom location"),
    otherwise: (schema) => schema.notRequired(),
  }),
  description: Yup.string().max(
    500,
    "Description cannot exceed 500 characters"
  ),
});

const AddEvent = () => {
  // State variables to show success or error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Get the addEvent function from context
  const { addEvent } = useEvents();

  // Navigation function to redirect to other pages
  const navigate = useNavigate();

  // Function to handle form submission
  const handleFormSubmit = async (formValues, formikHelpers) => {
    try {
      // Clear any previous messages
      setErrorMessage("");
      setSuccessMessage("");

      // Step 1: Determine the final duration value
      let eventDuration = formValues.duration;

      // If user selected custom duration, build the duration string
      if (formValues.duration === "custom") {
        const durationValue = formValues.customDurationValue;
        const durationUnit = formValues.customDurationUnit;

        // Convert to hours (h) or days (d) format
        if (durationUnit === "days") {
          eventDuration = `${durationValue}d`;
        } else {
          eventDuration = `${durationValue}h`;
        }
      }

      // Step 2: Determine the final location
      let eventLocation = formValues.location;

      // If user selected custom location, use the custom input value
      if (formValues.location === "Custom Location") {
        eventLocation = formValues.customLocation;
      }

      // Step 3: Build the event object to save
      const newEvent = {
        name: formValues.name,
        date: formValues.date,
        time: formValues.time,
        location: eventLocation,
        description: formValues.description,
        duration: eventDuration,
      };

      // Step 4: Save the event
      addEvent(newEvent);

      // Step 5: Show success message
      setSuccessMessage("Event created successfully!");

      // Step 6: Clear the form
      formikHelpers.resetForm();

      // Step 7: Wait 2 seconds then go back to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch {
      // If something goes wrong, show error message
      setErrorMessage("An error occurred while creating the event");
    } finally {
      // Stop the loading/submitting state
      formikHelpers.setSubmitting(false);
    }
  };

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const dateString = today.toISOString(); // Example: "2025-11-03T12:00:00.000Z"
    const datePart = dateString.split("T")[0]; // Get just "2025-11-03"
    return datePart;
  };

  return (
    <div className="page-container-top">
      <div className="help-page-bg fade-in">
        <Card className="form-card fade-in">
          <Card.Header>
            <h3>Add New Event</h3>
          </Card.Header>
          <Card.Body>
            {/* Show error message if there is one */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {/* Show success message if there is one */}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            <Formik
              initialValues={{
                name: "",
                date: "",
                time: "",
                duration: "1h",
                customDurationValue: "",
                customDurationUnit: "hours",
                location: "",
                customLocation: "",
                description: "",
              }}
              validationSchema={EventSchema}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Event Name *
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className={`form-control ${
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter event name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date *
                    </label>
                    <Field
                      type="date"
                      name="date"
                      min={getTodayDate()}
                      className={`form-control ${
                        touched.date && errors.date ? "is-invalid" : ""
                      }`}
                      onClick={(e) =>
                        e.target.showPicker && e.target.showPicker()
                      }
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Time *</label>
                    <div className="time-grid">
                      <select
                        className={`form-control ${
                          touched.time && errors.time ? "is-invalid" : ""
                        }`}
                        value={values.time.split(":")[0] || ""}
                        onChange={(e) => {
                          const minutes = values.time.split(":")[1] || "00";
                          setFieldValue("time", `${e.target.value}:${minutes}`);
                        }}
                      >
                        <option value="">Hour</option>
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        className={`form-control ${
                          touched.time && errors.time ? "is-invalid" : ""
                        }`}
                        value={values.time.split(":")[1] || ""}
                        onChange={(e) => {
                          const hour = values.time.split(":")[0] || "00";
                          setFieldValue("time", `${hour}:${e.target.value}`);
                        }}
                      >
                        <option value="">Minutes</option>
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Duration */}
                  <div className="mb-3">
                    <label className="form-label">Duration *</label>
                    <div className="duration-grid">
                      <select
                        className={`form-control ${
                          touched.duration && errors.duration
                            ? "is-invalid"
                            : ""
                        }`}
                        value={values.duration ?? ""}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setFieldValue("duration", newVal);
                          if (newVal === "custom") {
                            if (
                              values.customDurationValue === "" ||
                              values.customDurationValue === undefined
                            ) {
                              setFieldValue("customDurationValue", 1);
                            }
                            if (!values.customDurationUnit) {
                              setFieldValue("customDurationUnit", "hours");
                            }
                          } else {
                            // Clear custom fields when not in use to avoid controlled/uncontrolled flips
                            setFieldValue("customDurationValue", "");
                            setFieldValue("customDurationUnit", "hours");
                          }
                        }}
                        name="duration"
                      >
                        <option value="">Select duration</option>
                        <option value="1h">1h</option>
                        <option value="2h">2h</option>
                        <option value="5h">5h</option>
                        <option value="8h">8h</option>
                        <option value="1d">1 day</option>
                        <option value="custom">Custom</option>
                      </select>

                      {/* Custom duration controls */}
                      {values.duration === "custom" && (
                        <div className="d-flex gap-2">
                          <Field
                            type="number"
                            name="customDurationValue"
                            min="1"
                            placeholder="Amount"
                            className={`form-control ${
                              touched.customDurationValue &&
                              errors.customDurationValue
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <Field
                            as="select"
                            name="customDurationUnit"
                            className={`form-control ${
                              touched.customDurationUnit &&
                              errors.customDurationUnit
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                          </Field>
                        </div>
                      )}
                    </div>
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="invalid-feedback"
                    />
                    {values.duration === "custom" && (
                      <>
                        <ErrorMessage
                          name="customDurationValue"
                          component="div"
                          className="invalid-feedback"
                        />
                        <ErrorMessage
                          name="customDurationUnit"
                          component="div"
                          className="invalid-feedback"
                        />
                      </>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location *
                    </label>
                    <Field
                      as="select"
                      name="location"
                      className={`form-control ${
                        touched.location && errors.location ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        setFieldValue("location", e.target.value);
                        // Clear custom location when switching away from custom
                        if (e.target.value !== "Custom Location") {
                          setFieldValue("customLocation", "");
                        }
                      }}
                    >
                      <option value="">Select a conference room</option>
                      {venuesData.venues.map((venue) => (
                        <option key={venue.id} value={venue.name}>
                          {venue.name} (Capacity: {venue.capacity})
                        </option>
                      ))}
                      <option value="Custom Location">Custom Location</option>
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />

                    {/* Show amenities for selected venue */}
                    {values.location &&
                      values.location !== "Custom Location" &&
                      values.location !== "" && (
                        <small className="form-text text-muted mt-1 d-block">
                          ✨ Amenities:{" "}
                          {venuesData.venues
                            .find((v) => v.name === values.location)
                            ?.amenities.join(", ")}
                        </small>
                      )}

                    {/* Custom location input */}
                    {values.location === "Custom Location" && (
                      <div className="mt-2">
                        <Field
                          type="text"
                          name="customLocation"
                          className={`form-control ${
                            touched.customLocation && errors.customLocation
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter custom location (e.g., address, venue name)"
                        />
                        <ErrorMessage
                          name="customLocation"
                          component="div"
                          className="invalid-feedback"
                        />
                        <small className="form-text text-muted">
                          💡 Tip: Enter a specific address or venue name for map
                          integration
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows="4"
                      className={`form-control ${
                        touched.description && errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter event description (optional)"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Event..." : "Create Event"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddEvent;
