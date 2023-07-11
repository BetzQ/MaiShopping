import { Typography, Container, Grid, Paper, Link } from "@mui/material";
import profileImage from "/imgs/avwan.jpg";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <img
            src={profileImage}
            alt="Profile"
            style={{ width: "100%", maxWidth: 300, height: "auto", borderRadius: "50%", marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            variant="outlined"
            sx={{
              marginBottom: 2,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 18, textAlign: "center", marginBottom: 2 }}>
              Hello, I'm Muhamad Avwan. I am passionate about creating user-friendly and visually appealing web applications. I have expertise in HTML, CSS, JavaScript, TypeScript, React.js, Tailwind CSS, Bootstrap CSS, and Material-UI (MUI).
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 16 }}>
              Connect with me on LinkedIn:{" "}
              <Link href="https://www.linkedin.com/in/muhamad-avwan-58a75421b/" target="_blank" rel="noopener noreferrer">
                Muhamad Avwan
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
