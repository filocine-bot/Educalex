REVOKE EXECUTE ON FUNCTION public.create_learning_profile() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid,text) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid,text) TO authenticated;