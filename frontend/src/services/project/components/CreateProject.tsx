/** @jsxImportSource theme-ui */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Label, Input, Textarea } from "theme-ui";
import api from "../../../api/api";

interface Project {
  userId: number;
  title: string;
  description: string;
  deadline: string;
}

interface CreateProjectModalProps {
  onClose: () => void;
}

export const CreateProject: React.FC<CreateProjectModalProps> = ({ onClose }) => {
  const createNewProject = async (values: Project) => {
    try {
      const response = await api.post("/projects", {
        userId: values.userId,
        title: values.title,
        description: values.description,
        deadline: values.deadline,
      });
      console.log("Project created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
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
        bg: "rgba(0, 0, 0, 0.5)",
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
        <h2>Create New Project</h2>
        <Formik
          initialValues={{
            userId: 0,
            title: "",
            description: "",
            deadline: "",
          }}
          onSubmit={(values, actions) => {
            createNewProject(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={3}>
                <Label htmlFor="userId">User ID</Label>
                <Field as={Input} name="userId" type="number" required />
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
                <Label htmlFor="deadline">Deadline</Label>
                <Field as={Input} name="deadline" type="datetime-local" sx={{
                  color: "white",
                  '::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)',
                  },
                }} required />
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

export default CreateProject;
