import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/client/useGetListBookDetail';
import useGetListBookClient from '../../hooks/client/useGetListBookClient';
import ProductLayout from '../../layout/ProductLayot';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import LoadingScreen from '../../components/loading/LoadingScreen';

const ProductDetail = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const desRef = useRef<HTMLDivElement>(null);
  const [hiddenDescriptionFlag, setHiddenDescriptionFlag] =
    useState<boolean>(false);
  const [hiddenDescription, setHiddenDescription] = useState<boolean>(false);
  const { data, isLoading, isFetching, refetch } = useGetListBookDetail(
    id,
    !!id
  );

  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = useGetListBookClient();

  const numberOfLine = () => {
    if (desRef?.current) return desRef?.current?.clientHeight / 20;
    return 0;
  };

  useEffect(() => {
    console.log(router?.query);
    if (router.isReady) {
      setId(router?.query?.id as any);
    }
  }, [router, setId]);
  console.log(data);

  useEffect(() => {
    if (numberOfLine() > 3 && !hiddenDescriptionFlag) {
      setHiddenDescription(true);
      setHiddenDescriptionFlag(true);
    }
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProductLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <Paper
          sx={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack>
            <Stack direction="row" sx={{ p: 1 }}>
              <ProductInfo data={data} isLoading={isLoading} />
            </Stack>
            <Stack sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
              <Typography
                variant="h3"
                sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 1 } }}
              >
                Thông tin sản phẩm
              </Typography>
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 4 }}
                sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 1 } }}
              >
                <Stack direction="column" spacing={1}>
                  {' '}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Mã sách
                    </Typography>{' '}
                    <Box>{data?.isbn}</Box> {/* render authors */}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Tác giả
                    </Typography>
                    <Box>
                      {data &&
                        data?.authors.map((author: any, _index: number) => {
                          if (_index === data?.authors.length - 1)
                            return <span key={_index}>{author?.name}</span>;
                          return <span key={_index}>{author?.name}, </span>;
                        })}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Nhà xuất bản
                    </Typography>
                    <Box>{data && data?.publisher?.name}</Box>{' '}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Số trang
                    </Typography>
                    <Box>{data?.total_pages}</Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Thể loại
                    </Typography>
                    {/* render genres */}
                    <Box>
                      {data &&
                        data?.genres.map((genre: any, _index: number) => {
                          if (_index === data?.genres.length - 1)
                            return <span key={_index}>{genre?.name}</span>;
                          return <span key={_index}>{genre?.name}, </span>;
                        })}{' '}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Số lượng còn lại
                    </Typography>
                    <Box>{data && data?.available_quantity}</Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Mô tả sách
                    </Typography>
                    <Stack spacing={1}>
                      {' '}
                      <Box
                        sx={
                          hiddenDescription
                            ? {
                                overflow: 'hidden',
                                maxHeight: '60px',
                                lineHeight: '20px',
                              }
                            : {
                                lineHeight: '20px',
                                overflow: 'hidden',
                              }
                        }
                      >
                        {' '}
                        <Box ref={desRef}>
                          {(data && data?.description) || 'Chưa có mô tả'}
                        </Box>
                      </Box>
                      {desRef?.current &&
                        numberOfLine() > 3 &&
                        data?.description && (
                          <Button
                            onClick={() =>
                              setHiddenDescription(!hiddenDescription)
                            }
                          >
                            {hiddenDescription ? 'Xem thêm' : 'Rút gọn'}
                          </Button>
                        )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack direction="column" sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ py: 2 }}>
            Sản phẩm liên quan{' '}
          </Typography>
          <ProductSlides
            slideData={slideData}
            isSlideLoading={isSlideLoading}
            isSlideFetching={isSlideFetching}
          />
        </Stack>
      </Box>
    </ProductLayout>
  );
};

export default ProductDetail;
