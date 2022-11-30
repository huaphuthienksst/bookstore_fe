import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';
import QuantityButton from '../extended/Quantity';
import { FC } from 'react';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'contain',
  margin: '5px 0',
  width: '100px',
  height: 'auto',
});

interface IItemTableMobile {
  items: any;
  handleIncreaseQuantity: Function;
  handleDecreaseQuantity: Function;
  handleDelete: Function;
  setListItem?: Function;
}

const ItemTableMobile: FC<IItemTableMobile> = ({
  items,
  setListItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleDelete,
}) => {
  return (
    <Paper sx={{ margin: 2 }}>
      {items.map((item: any, _index: number) => (
        <Stack
          key={_index}
          direction="row"
          alignItems={'flex-end'}
          justifyContent="space-between"
          mt={2}
          mb={2}
        >
          <Stack
            direction="row"
            alignItems={'center'}
            spacing={{ xs: 2, md: 4 }}
          >
            <ImageStyle alt={item.name} src={item.image} />

            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography fontSize="14px">{item.name}</Typography>
              <Stack direction="column" spacing={1}>
                <Typography fontSize="14px" fontWeight="bold">
                  {item.price} đ
                </Typography>
                <QuantityButton
                  currentQuantity={item?.quantity}
                  handleIncreaseQuantity={() =>
                    handleIncreaseQuantity(item?.id)
                  }
                  handleDecreaseQuantity={() =>
                    handleDecreaseQuantity(item?.id)
                  }
                />
              </Stack>
            </Stack>
          </Stack>
          <IconButton
            sx={{ padding: '0 0 2px 0' }}
            size="small"
            disableFocusRipple
            disableRipple
            onClick={() => handleDelete(item?.id)}
          >
            <Delete />
          </IconButton>
        </Stack>
      ))}
    </Paper>
  );
};

export default ItemTableMobile;
