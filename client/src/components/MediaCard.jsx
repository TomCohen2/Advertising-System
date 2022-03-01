import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./ShowAllAds.css";
import axios from "axios";

export default function MediaCard({ ad }) {
  const { _id, name, description, image, screens, duration } = ad;

  return (
    <Card className="card" sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt="ad image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Presented on screens: ${screens}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Ad duration: ${duration / 1000} seconds`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="btn" href={`/edit-ad/${_id}`} size="small">
          Edit
        </Button>
        <Button
          className="btn"
          size="small"
          name={_id}
          title={name}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
function handleDelete(e) {
  if (window.confirm(`Are you sure you want to delete ${e.target.title}?`)) {
    axios.delete(`http://localhost:8000/api/ad/${e.target.name}`);
    window.location.reload();
  } else {
    console.log();
  }

  console.log(e.target.name);
}
