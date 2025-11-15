- Creating Conda env:
 
```
conda create -n hcltech python=3.11 -y
conda activate hcltech 

pip install -r requirements.txt
```

```
cd /home/asa/hcltech
export GOOGLE_API_KEY="$(grep ^GOOGLE_API_KEY /home/asa/hcltech/.env | cut -d'=' -f2-)"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 1
```