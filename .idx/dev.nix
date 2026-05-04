{ pkgs, ... }: {
  channel = "stable-24.11";

  packages = [
    pkgs.python3
    pkgs.python3Packages.pip
    pkgs.nodejs_22
    pkgs.awscli2
  ];

  env = {
    PYTHONPATH = "/home/user/letsfilling/Letsfiling/backend/vendor";
  };

  idx = {
    extensions = [
      "ms-python.python"
      "dbaeumer.vscode-eslint"
      "google.gemini-cli-vscode-ide-companion"
    ];

    workspace = {
      onCreate = {
        install-backend-deps = "pip install -r Letsfiling/backend/requirements.txt --target Letsfiling/backend/vendor";
        install-frontend-deps = "npm install --prefix Letsfiling/frontend";
        copy-env = "cp Letsfiling/backend/.env.example Letsfiling/backend/.env";
      };
      onStart = {
        start-backend = "cd Letsfiling/backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload";
      };
    };
  };
}
