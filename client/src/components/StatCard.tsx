import { Card, CardContent, Grid, Typography } from "@mui/material";

type StatCardProps = {
  stat: string | number | null;
  label: string;
};

function StatCard({ stat, label }: StatCardProps) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h3">{stat ?? "-"}</Typography>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StatCard;
