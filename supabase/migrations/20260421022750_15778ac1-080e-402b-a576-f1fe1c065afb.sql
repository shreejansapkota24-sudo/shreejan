CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry (public form)
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) > 0 AND length(name) <= 100
  AND length(email) > 0 AND length(email) <= 255
  AND length(message) > 0 AND length(message) <= 2000
);

-- No public read policy (only project owner via dashboard)
CREATE INDEX inquiries_created_at_idx ON public.inquiries (created_at DESC);