"""HAR sanitizer 不处理 JSON 正文；补充移除作品授权票据和个人标识。"""
import json,pathlib,re,hashlib
p=pathlib.Path(__file__).resolve().parent.parent;files=list((p/'dia/resources/claude.ai/api/frame').glob('*'));values=set();paths=[]
def walk(o,where=''):
 if isinstance(o,dict):
  for k,v in o.items():
   at=where+'.'+k
   if re.search(r'token|email|avatar_grant',k,re.I) and isinstance(v,str) and v:values.add(v);paths.append(at)
   else:walk(v,at)
 elif isinstance(o,list):
  for i,v in enumerate(o):walk(v,where+f'[{i}]')
for f in files:
 try:walk(json.loads(f.read_text()))
 except Exception:pass
changed=[]
for f in (p/'dia').rglob('*'):
 if not f.is_file() or f.suffix in ['.png','.woff2']:continue
 try:text=f.read_text()
 except UnicodeDecodeError:continue
 original=text
 for value in sorted(values,key=len,reverse=True):
  if len(value)<4:continue
  text=text.replace(value,'[REDACTED]').replace(json.dumps(value)[1:-1],'[REDACTED]')
 if text!=original:f.write_text(text);changed.append(str(f.relative_to(p)))
m=json.loads((p/'dia/resource-manifest.json').read_text())
for r in m:
 f=p/r['path'];b=f.read_bytes();h=hashlib.sha256(b).hexdigest()
 if h!=r['sha256']:r['redacted']=True;r['originalBytes']=r['bytes'];r['bytes']=len(b);r['sha256']=h
(p/'dia/resource-manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2))
(p/'dia/body-redaction.json').write_text(json.dumps({'redactedFields':sorted(set(paths)),'modifiedFiles':changed,'valuesPrinted':False},ensure_ascii=False,indent=2))
print('redacted fields',len(set(paths)),'files',len(changed),'secret values not printed')
