import { supabase } from "./supabase";
import type { Plot, PlotInput } from "../types/plot";

export async function fetchPlots(): Promise<Plot[]> {
  const { data, error } = await supabase
    .from("plots")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Plot[];
}

export async function createPlot(input: PlotInput): Promise<Plot> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("plots")
    .insert({ ...input, user_id: user!.id })
    .select()
    .single();

  if (error) throw error;
  return data as Plot;
}

export async function updatePlot(id: string, input: PlotInput): Promise<Plot> {
  const { data, error } = await supabase
    .from("plots")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Plot;
}

export async function deletePlot(id: string): Promise<void> {
  const { error } = await supabase.from("plots").delete().eq("id", id);
  if (error) throw error;
}
