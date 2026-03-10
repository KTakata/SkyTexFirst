export type Plot = {
  id: string;
  user_id: string;
  title: string;
  synopsis: string;
  created_at: string;
  updated_at: string;
};

export type PlotInput = {
  title: string;
  synopsis: string;
};
