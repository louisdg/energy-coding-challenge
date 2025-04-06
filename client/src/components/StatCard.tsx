import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import spacing from "../theme/spacing.ts";

type StatCardProps = {
  stat: string | number | null;
  label: string;
};

function StatCard({ stat, label }: StatCardProps) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
      <Card>
        <CardContent>
          <Stack spacing={spacing.xs}>
            <Typography variant="h3">{stat ?? "-"}</Typography>
            <Typography variant="body2" color="textSecondary">
              {label}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StatCard;
