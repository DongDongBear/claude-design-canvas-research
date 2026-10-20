"""公开副本只去除机器路径/组织查询；原始本机取证目录不变。"""
import gzip,hashlib,json,pathlib,re,urllib.parse
ROOT=pathlib.Path(__file__).resolve().parent.parent
changes=[]
def scrub(text):
 home = str(pathlib.Path.home())
 capture = str(pathlib.Path.home()/'Desktop/youdesktop/out/dev-sessions/claude-canvas-20261020')
 return text.replace(capture,'<CAPTURE_ROOT>').replace(str(ROOT),'<REPOSITORY_ROOT>').replace(home,'<USER_HOME>')
for f in (ROOT/'analysis-rea').iterdir():
 if not f.is_file():continue
 if f.suffix=='.gz':
  data=gzip.decompress(f.read_bytes());edited=scrub(data.decode()).encode()
  if edited!=data:
   f.write_bytes(gzip.compress(edited,compresslevel=6,mtime=0));changes.append(str(f.relative_to(ROOT)))
 else:
  try:text=f.read_text()
  except UnicodeDecodeError:continue
  edited=scrub(text)
  if text!=edited:f.write_text(edited);changes.append(str(f.relative_to(ROOT)))
manifest_path=ROOT/'analysis-rea/archive-manifest.json';records=json.loads(manifest_path.read_text())
for row in records:
 body=gzip.decompress((ROOT/'analysis-rea'/row['gzip']).read_bytes());digest=hashlib.sha256(body).hexdigest()
 if digest!=row['sha256']:
  row['originalLocalSha256']=row['sha256'];row['originalLocalBytes']=row['uncompressedBytes'];row['sha256']=digest;row['uncompressedBytes']=len(body);row['publicMachinePathsRedacted']=True
manifest_path.write_text(json.dumps(records,ensure_ascii=False,indent=2))
for name in ['asset-manifest.json','browser-assets-initial.json','capture/network-reload.json','http-resource-downloads.json']:
 f=ROOT/name;o=json.loads(f.read_text())
 def visit(v):
  if isinstance(v,dict):
   for k,x in list(v.items()):
    if k=='url' and isinstance(x,str) and 'org=' in x:
     u=urllib.parse.urlsplit(x);q=urllib.parse.parse_qsl(u.query,keep_blank_values=True)
     v[k]=urllib.parse.urlunsplit((u.scheme,u.netloc,u.path,urllib.parse.urlencode([(a,b) for a,b in q if a!='org']),u.fragment));v['redactedQueryFields']=['org']
    else:visit(x)
  elif isinstance(v,list):
   for x in v:visit(x)
 visit(o);f.write_text(json.dumps(o,ensure_ascii=False,indent=2))
f=ROOT/'dia/sanitization.json';d=json.loads(f.read_text());d['removedPaths']=[re.sub(r'/api/organizations/[0-9a-f-]+','/api/organizations/[REDACTED]',x) for x in d['removedPaths']];f.write_text(json.dumps(d,ensure_ascii=False,indent=2))
(ROOT/'evidence/public-archive-redaction.json').write_text(json.dumps({'machinePathFiles':changes,'orgQueryFieldsRemoved':True,'thirdPartyBundlesChanged':False,'originalCapturePreservedOutsideRepository':True},ensure_ascii=False,indent=2))
print('public archive redacted machine-path files:',len(changes))
