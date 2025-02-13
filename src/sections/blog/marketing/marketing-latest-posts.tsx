import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import Iconify from 'src/components/iconify';

import { IBlogPostProps } from 'src/types/blog';

import MarketingLatestPostItem from './marketing-latest-post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function MarketingLatestPosts({ posts }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    slidesToShow: 3,
    slidesToScroll: 1,
    ...CarouselDots(),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.marketing.posts}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      Ver tudo
    </Button>
  );

  return (
    <Container
      sx={{
        py: { xs: 8, md: 15 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <Typography variant="h3">Veja nosso Portfolio</Typography>

        {mdUp && viewAllBtn}
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{ sx: { left: { xs: 0, md: -40 } } }}
          rightButtonProps={{ sx: { right: { xs: 0, md: -40 } } }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {posts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  px: 2,
                  py: { xs: 8, md: 10 },
                }}
              >
                <MarketingLatestPostItem post={post} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>

      {!mdUp && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          {viewAllBtn}
        </Stack>
      )}
    </Container>
  );
}
