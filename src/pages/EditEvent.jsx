import React, { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../contexts/event";
import venuesData from "../data/venues.json";
import "./EditEvent.css";

const EventSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Event name must be at least 2 characters")
    .required("Event name is required"),
  date: Yup.date().required("Event date is required"),
  time: Yup.string().required("Event time is required"),
  location: Yup.string()
    .min(2, "Location must be at least 2 characters")
    .required("Location is required"),
  description: Yup.string().max(
    500,
    "Description cannot exceed 500 characters"
  ),
});

const EditEvent = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [event, setEvent] = useState(null);
  const { updateEvent, getEvent } = useEvents();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const eventData = getEvent(id);
    if (eventData) {
      setEvent(eventData);
    } else {
      setError("Event not found");
    }
  }, [id, getEvent]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");
      setSuccess("");

      updateEvent(id, values);
      setSuccess("Event updated successfully!");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch {
      setError("An error occurred while updating the event");
    } finally {
      setSubmitting(false);
    }
  };

  if (!event) {
    return (
      <div className="page-container-top">
        <div className="help-page-bg fade-in">
          <Alert variant="danger" className="text-center">
            {error || "Loading..."}
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container-top">
      <div className="help-page-bg fade-in">
        <Card className="form-card fade-in">
          <Card.Header>
            <h3>Edit Event</h3>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Formik
              initialValues={{
                name: event.name || "",
                date: event.date || "",
                time: event.time || "",
                location: event.location || "",
                description: event.description || "",
              }}
              validationSchema={EventSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, touched, errors, values }) => (
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
                      className={`form-control ${
                        touched.date && errors.date ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                      Time *
                    </label>
                    <Field
                      type="time"
                      name="time"
                      className={`form-control ${
                        touched.time && errors.time ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="invalid-feedback"
                    />
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
                      {isSubmitting ? "Updating Event..." : "Update Event"}
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

export default EditEvent;
