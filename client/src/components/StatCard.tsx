import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useId } from "react";

type StatCardProps = {
  stat: string | number | null;
  label: string;
};

function StatCard({ stat, label }: StatCardProps) {
  const statId = useId();
  return (
    <Grid
      size={{ xs: 12, md: 6, lg: 3 }}
      role="region"
      aria-labelledby={statId}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {stat ?? "-"}
          </Typography>
          <Typography variant="caption" color="textSecondary" id={statId}>
            {label}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StatCard;
