import React from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "./Theme";
import { Typography, Grid, Container, Link, Box } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  footer: {
    position: "relative",
    width: "100%",
    backgroundColor: theme.palette.common.green,
  },
  text: { color: theme.palette.common.white },
}));

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const Footer: React.FC<any> = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    // @ts-ignore
    <div style={{ width: "100%", backgroundColor: theme.palette.common.green }}>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer: any) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" className={classes.text} gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item: any) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" className={classes.text}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" className={classes.text} align="center">
            {"Copyright © "}
            My Website
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Footer;
