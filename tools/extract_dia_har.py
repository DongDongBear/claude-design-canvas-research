"""从 Dia 的 sanitized HAR 留存目标代码，移除账号/成员/遥测与请求正文。"""
import base64,hashlib,json,pathlib,urllib.parse
p=pathlib.Path(__file__).resolve().parent.parent;har=p/'dia/dia-editing-initial.har';d=json.loads(har.read_text());entries=d['log']['entries'];kept=[];removed=[];saved=[]
for e in entries:
 u=e['request']['url'];parts=urllib.parse.urlsplit(u)
 if any(s in u for s in ['/api/account','/api/organizations/','/telemetry','/api/frame/track','/api/frame/page-health/']):removed.append(parts.path);continue
 e['request'].pop('postData',None);e.pop('_webSocketMessages',None)
 for msg in ['request','response']:
  e[msg]['headers']=[h for h in e[msg]['headers'] if h['name'].lower() not in ['cookie','set-cookie','authorization','x-api-key']]
  e[msg].pop('cookies',None)
 kept.append(e)
 c=e['response']['content'];t=c.get('text')
 if t is None or parts.scheme not in ['https','http','blob']:continue
 b=base64.b64decode(t) if c.get('encoding')=='base64' else t.encode();digest=hashlib.sha256(b).hexdigest()
 if parts.scheme=='blob':rel='dia/resources/blob-'+digest[:16]+'.js'
 else:rel='dia/resources/'+parts.netloc+parts.path+('index.html' if parts.path.endswith('/') else '')+('__'+hashlib.sha256(parts.query.encode()).hexdigest()[:12] if parts.query else '')
 f=p/rel;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b);saved.append({'url':u,'path':rel,'bytes':len(b),'sha256':digest,'mimeType':c['mimeType'],'status':e['response']['status'],'method':'Dia-DevTools-HAR'})
d['log']['entries']=kept;har.write_text(json.dumps(d,ensure_ascii=False,indent=2));(p/'dia/resource-manifest.json').write_text(json.dumps(saved,ensure_ascii=False,indent=2));(p/'dia/sanitization.json').write_text(json.dumps({'inputEntries':len(entries),'retainedEntries':len(kept),'removedPaths':removed,'requestBodiesRemoved':True,'credentialHeadersRemoved':True,'responseBodiesRetainedOnlyForTargetResources':True},ensure_ascii=False,indent=2))
print('retained',len(kept),'removed',len(removed),'response bodies saved',len(saved));print('bytes',sum(x['bytes'] for x in saved));print('captured scripts',sum(x['mimeType'] in ['text/javascript','application/javascript'] for x in saved))
