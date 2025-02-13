import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import { IBlogPostProps } from 'src/types/blog';

import PostItemMobile from '../common/post-item-mobile';
import PostItem from './elearning-post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function ElearningLatestPosts({ posts }: Props) {
  const mdUp = useResponsive('up', 'md');

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.eLearning.posts}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      View All
    </Button>
  );

  return (
    <Container
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h3">Veja nosso Portfolio</Typography>

        {mdUp && viewAllBtn}
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {posts
          .slice(0, 3)
          .map((post) =>
            mdUp ? (
              <PostItem key={post.id} post={post} />
            ) : (
              <PostItemMobile key={post.id} post={post} />
            )
          )}
      </Box>

      {!mdUp && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          {viewAllBtn}
        </Stack>
      )}
    </Container>
  );
}
