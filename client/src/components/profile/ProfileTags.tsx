import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Tags } from '@prisma/client';
import TagsAutoComplete from '../TagsAutoComplete';

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';

export default ({savedTags, editable = false, refreshParent} : {savedTags: Tags[], editable?: boolean, refreshParent: Function}) => {

  const [all, setAll] = useState<Tags[]>([]);
  const allREF = useRef(all);
  const [selected, setSelected] = useState<Tags[]>([...savedTags]);
  const [editMode, setEditMode] = useState(false);

  const getAllTags = () => {
    axios.get(`/api/tags/all/post`)
    .then(({data}) => {
      setAll(data);
      console.log(data)
    })
  }

  const handleChange = (e: React.SyntheticEvent, newValue: Tags[]) => {
    setSelected(newValue)
  }

  const toggleEdit = () => {
    setEditMode((cur) => !cur)
    setSelected(savedTags);
  }

  const saveTags = async () => {
    setEditMode(false);
    await axios.put(`/api/tags/user`, {tags: selected});
    refreshParent();
  }

  useEffect(getAllTags, [allREF]);

  return (
    <Grid container>
      <Grid item xs={10}>
        {
          editMode ?
          <TagsAutoComplete {...{all, selected, handleChange}} />
          :
          <>
            {savedTags.map((tag: Tags, index: number) => (
              <Chip
                variant="outlined"
                label={tag.name}
                key={tag.name + index}
              />
            ))}
          </>
        }
      </Grid>
      <Grid item xs={2} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {
          editMode ?
          <ButtonGroup >
            <Tooltip title="Save Tags">
              <Button onClick={saveTags} variant="contained" >
                <SaveIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Cancel">
              <Button onClick={toggleEdit} variant="contained" color="error" >
                <CloseIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
          :
          <Tooltip title="Add Tags">
          <Button onClick={toggleEdit} variant="contained">
            <AddIcon />
          </Button>
          </Tooltip>
        }
      </Grid>
    </Grid>
  )
}