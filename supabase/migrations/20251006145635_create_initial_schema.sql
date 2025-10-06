/*
  # Create Initial Schema for Patinhas do Instituto

  ## Tables Created
  
  ### 1. `gatos` (Cats Table)
  Stores information about all cats in the campus census
  - `id` (uuid, primary key) - Unique identifier
  - `nome` (text, required) - Cat's name
  - `sexo` (text, required) - Gender: MASCULINO, FEMININO, DESCONHECIDO
  - `vacinado` (text, required) - Vaccination status: SIM, NAO, DESCONHECIDO
  - `castrado` (text, required) - Neutering status: SIM, NAO, DESCONHECIDO
  - `status` (text, required) - Current status: campus, tratamento, adotado, falecido, desconhecido
  - `local_habitual` (text, required) - Usual location on campus
  - `caracteristicas_marcantes` (text) - Notable characteristics
  - `fotos` (text[], default []) - Array of photo URLs
  - `data_ultima_vacinacao` (date) - Date of last vaccination
  - `criado_em` (timestamptz, default now()) - Creation timestamp
  - `atualizado_em` (timestamptz, default now()) - Last update timestamp
  - `cadastrado_por` (uuid, references auth.users) - Protector who registered the cat

  ### 2. `protetores` (Protectors Table)
  Stores information about protectors (users who can manage cats)
  - `id` (uuid, primary key, references auth.users) - Links to Supabase auth user
  - `nome` (text, required) - Protector's name
  - `email` (text, unique, required) - Protector's email
  - `fotos` (text[], default []) - Array of photo URLs
  - `cadastrado_por` (uuid, references auth.users) - Protector who registered this user
  - `criado_em` (timestamptz, default now()) - Creation timestamp
  - `atualizado_em` (timestamptz, default now()) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on both tables
  - Public read access for all cat data (anyone can view)
  - Authenticated users (protectors) can create/update cats
  - Protectors can only view other protectors' basic info
  - Only authenticated users can register new protectors
  
  ### Policies Created
  
  #### For `gatos` table:
  - "Anyone can view cats" - Public SELECT access
  - "Authenticated users can insert cats" - Protectors can add cats
  - "Authenticated users can update cats" - Protectors can edit cats
  - "Authenticated users can delete cats" - Protectors can remove cats
  
  #### For `protetores` table:
  - "Anyone can view protectors" - Public SELECT access
  - "Authenticated users can view own data" - Self data access
  - "Authenticated users can insert protectors" - Register new protectors
  - "Authenticated users can update own data" - Self data modification

  ## Functions
  - Auto-update `atualizado_em` timestamp on row updates

  ## Important Notes
  - First protector must be manually created in Supabase Auth
  - Subsequent protectors registered through the application
  - All cat data is public for viewing
  - Only authenticated protectors can modify data
  - 4-hour session timeout configured in Supabase Auth settings
*/

CREATE TABLE IF NOT EXISTS gatos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  sexo text NOT NULL CHECK (sexo IN ('MASCULINO', 'FEMININO', 'DESCONHECIDO')),
  vacinado text NOT NULL CHECK (vacinado IN ('SIM', 'NAO', 'DESCONHECIDO')),
  castrado text NOT NULL CHECK (castrado IN ('SIM', 'NAO', 'DESCONHECIDO')),
  status text NOT NULL CHECK (status IN ('campus', 'tratamento', 'adotado', 'falecido', 'desconhecido')),
  local_habitual text NOT NULL,
  caracteristicas_marcantes text DEFAULT '',
  fotos text[] DEFAULT '{}',
  data_ultima_vacinacao date,
  criado_em timestamptz DEFAULT now(),
  atualizado_em timestamptz DEFAULT now(),
  cadastrado_por uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS protetores (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text NOT NULL,
  email text UNIQUE NOT NULL,
  fotos text[] DEFAULT '{}',
  cadastrado_por uuid REFERENCES auth.users(id),
  criado_em timestamptz DEFAULT now(),
  atualizado_em timestamptz DEFAULT now()
);

ALTER TABLE gatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE protetores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cats"
  ON gatos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert cats"
  ON gatos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update cats"
  ON gatos FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete cats"
  ON gatos FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view protectors"
  ON protetores FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can view own data"
  ON protetores FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Authenticated users can insert protectors"
  ON protetores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update own data"
  ON protetores FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION update_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gatos_atualizado_em
  BEFORE UPDATE ON gatos
  FOR EACH ROW
  EXECUTE FUNCTION update_atualizado_em();

CREATE TRIGGER update_protetores_atualizado_em
  BEFORE UPDATE ON protetores
  FOR EACH ROW
  EXECUTE FUNCTION update_atualizado_em();

CREATE INDEX IF NOT EXISTS idx_gatos_status ON gatos(status);
CREATE INDEX IF NOT EXISTS idx_gatos_criado_em ON gatos(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_protetores_email ON protetores(email);
