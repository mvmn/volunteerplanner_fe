import EditIcon from '@mui/icons-material/Edit';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import { IconButton, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const CategoryContent = forwardRef(function CustomContent(props, ref) {
  const { classes, className, label, nodeId, expansionIcon, editable, onEdit, tooltip, ...rest } =
    props;

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection } =
    useTreeItem(nodeId);

  const icon = expansionIcon;

  const handleClick = event => {
    handleExpansion(event);
    handleSelection(event);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(nodeId);
    }
  };

  return (
    <Tooltip title={tooltip} placement='right'>
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled
        })}
        ref={ref}
        {...rest}
      >
        <div onClick={handleClick} className={classes.iconContainer}>
          {icon}
        </div>

        <Typography onClick={handleClick} component='div' className={classes.label}>
          {label}
        </Typography>

        {editable && (
          <IconButton size='small' onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        )}
      </div>
    </Tooltip>
  );
});

export const CategoryTreeItem = ({ editable, onEdit, tooltip, ...rest }) => {
  return (
    <TreeItem
      ContentComponent={CategoryContent}
      ContentProps={{ editable, onEdit, tooltip: tooltip || '' }}
      {...rest}
    />
  );
};
