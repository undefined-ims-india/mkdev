import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useParams, Link } from "react-router-dom";
import { PostWithRelations } from "../../../../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import MarkDown from "../MarkDown";
import RepoDisplay from "./RepoDisplay";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const FullPost = (): React.ReactElement => {
  const { id } = useParams();
  const [content, setContent]: [PostWithRelations | null, Function] =
    useState(null);
  const contentREF = useRef(content);
  const userId = useContext(UserContext).userId;

  const handleLike = () => {
    axios
      .patch(
        `/api/posts/${content!.id}/${content!.likedByUser ? "dislike" : "like"}`,
      )
      .then(() => {
        getPost();
      });
  };

  const getPost = () => {
    axios.get(`/api/posts/${id}`).then(({ data }) => {
      setContent(data);
    });
  };

  useEffect(getPost, [contentREF]);

  try {
    return (
      <Grid container spacing={0}>
        <Grid item xs />
        <Grid item xs={10}>
          <Paper>
            <div className="fill">
              {content!.s3_key ? <img alt="cover image" src={`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${content!.s3_key}`} /> : <></>}
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 1,
                marginTop: 1,
                alignItems: "center",
              }}
            >
              <Link to={`/user/${content!.author.id}/profile`}>
                <Avatar
                  alt={content!.author.username!}
                  src={content!.author.picture!}
                >
                  {"?"}
                </Avatar>
              </Link>
              <Typography
                variant="h1"
                sx={{ fontSize: 23, marginLeft: 2, marginRight: 2 }}
              >
                {content!.author.username || content!.author.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "silver" }}>
                {dayjs(content!.createdAt).fromNow()}
              </Typography>
              <IconButton
                aria-label="Like"
                onClick={handleLike}
                disabled={!userId}
              >
                {content!.likedByUser ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant="body1">{content!.liked.length}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginLeft: 2 }}
            >
              <Box sx={{ marginTop: 2 }}>
                <MarkDown text={content!.title} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 1,
                  marginTop: -1,
                  alignItems: "center",
                }}
              >
                {content!.tags.length ? (
                  content!.tags.map((tag) => (
                    <Chip
                      label={tag.name}
                      variant="outlined"
                      size="small"
                      key={tag.name + content!.id}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <MarkDown text={content!.body} />
              </Box>
            </Box>
            <Box>
              {content!.repo ? <RepoDisplay content={content!.repo} /> : <></>}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    );
  } catch (err) {
    console.error(err);
    return <></>;
  }
};

export default FullPost;
