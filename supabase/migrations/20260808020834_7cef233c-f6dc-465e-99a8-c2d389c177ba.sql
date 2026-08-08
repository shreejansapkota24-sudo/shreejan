-- Ensure RLS is on
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- No Data API access for public/authenticated clients; only the server function (service_role) may write
REVOKE ALL ON public.inquiries FROM anon;
REVOKE ALL ON public.inquiries FROM authenticated;
GRANT ALL ON public.inquiries TO service_role;

-- Explicit deny-all policies so intent is documented and no accidental broad access is possible
CREATE POLICY "No client read access to inquiries"
  ON public.inquiries FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "No client insert access to inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "No client update access to inquiries"
  ON public.inquiries FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "No client delete access to inquiries"
  ON public.inquiries FOR DELETE
  TO anon, authenticated
  USING (false);