/** @jsxImportSource theme-ui */
import { Box, Heading } from "theme-ui";

export const DashboardCard = ({ title, children, }) => {
  return (
    <Box
      sx={{
        bg: "muted",
        borderRadius: "16px",
        p: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>
        {title}
      </Heading>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </Box>
    </Box>
  )
}

export default DashboardCard;