/** @jsxImportSource theme-ui */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Label, Input, Textarea } from "theme-ui";
import api from "../../../api/api";

interface Task {
    projectId: number;
    title: string;
    description: string;
    status: string;
    startDate: string;
    durationInDays: number;
    reporter: string;
    assignee?: string;
}

interface CreateTaskModalProps {
    onClose: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose }) => {
    const createNewTask = async (values: Task) => {
        try {
            const response = await api.post("/tasks", {
                projectId: values.projectId,
                title: values.title,
                description: values.description,
                status: values.status,
                startDate: values.startDate,
                durationInDays: values.durationInDays,
                reporter: values.reporter,
                assignee: values.assignee,
            });
            console.log("Task created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bg: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    bg: "background",
                    p: 4,
                    borderRadius: "md",
                    width: "400px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                }}
            >
                <h2>Create New Task</h2>
                <Formik
                    initialValues={{
                        projectId: 0,
                        title: "",
                        description: "",
                        status: "",
                        startDate: "",
                        durationInDays: "",
                        reporter: "",
                        assignee: ""
                    }}
                    onSubmit={(values, actions) => {
                        createNewTask(values);
                        actions.setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box mb={3}>
                                <Label htmlFor="projectId">Project ID</Label>
                                <Field as={Input} name="projectId" type="number" required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="title">Title</Label>
                                <Field as={Input} name="title" required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="description">Description</Label>
                                <Field as={Textarea} name="description" rows={3} required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="status">Status</Label>
                                <Field as={Input} name="status" required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="startDate">Start Date</Label>
                                <Field as={Input} name="startDate" type="datetime-local" sx={{
                                    color: "white",
                                    '::-webkit-calendar-picker-indicator': {
                                        filter: 'invert(1)',
                                    },
                                }} required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="durationInDays">Duration (in days)</Label>
                                <Field as={Input} name="durationInDays" type="number" required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="reporter">Reporter</Label>
                                <Field as={Input} name="reporter" required />
                            </Box>

                            <Box mb={3}>
                                <Label htmlFor="assignee">Assignee</Label>
                                <Field as={Input} name="assignee" />
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Button type="button" variant="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    Create
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default CreateTaskModal;
