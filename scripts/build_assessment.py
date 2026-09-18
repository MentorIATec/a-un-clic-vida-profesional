"""Compile reviewed Markdown without rewriting its narratives. Python standard library only."""
from pathlib import Path
import re,json,shutil
ROOT=Path(__file__).resolve().parents[1]
C=ROOT/'content/assessment-lab';O=ROOT/'docs/assessment-lab';O.mkdir(exist_ok=True)
session=json.loads((C/'sesion-ad26.json').read_text());rubric=json.loads((C/'rubrica.json').read_text())
source=(C/'casos-ad26.md').read_text()
parts=re.split(r'^## Equipo (\d+) (.+)\n',source,flags=re.M)
cases=[]
for i in range(1,len(parts),3):
 team=int(parts[i]);title=parts[i+1];body=parts[i+2].strip();assignment=next(a for a in session['assignments'] if a['team']==team)
 narrative,rest=body.split('**Encargo y límites.** ',1)
 task,rest=rest.split('**Presión que deben atender.** ',1)
 pressure,audience=rest.split('**Comité que selecciona:** ',1)
 case={'id':assignment['caseId'],'version':'1.0','title':title,'sector':assignment['sector'],'focus':assignment['focus'],'context':narrative.strip().split('\n\n'),'task':task.strip(),'pressure':pressure.strip(),'audience':audience.strip()}
 assert all(case[k] for k in ['id','title','task','pressure','audience'])
 cases.append(case)
assert len(cases)==len(session['assignments'])==7
assert len({c['id'] for c in cases})==7
instructions=(C/'instrucciones.md').read_text()
protected=instructions.split('## Entregables\n\n',1)[1].split('\n\n## Para preparar las respuestas',1)[0]
questions=[{'title':'¿Qué aporta cada persona?','hint':'Fortaleza y conocimiento, una experiencia concreta y su aplicación al caso.'},{'title':'¿Cómo trabajaríamos juntos?','hint':'Cómo se complementan y quién se ocuparía de cada parte del primer paso.'},{'title':'¿Qué haríamos primero y por qué?','hint':'Una acción y su razón, el dato que verificarían y qué responderían ante la presión.'},{'title':'¿Por qué seleccionar a nuestro equipo?','hint':'Su valor para el proyecto, una frase memorable y un compromiso realizable.'}]
(O/'data.json').write_text(json.dumps({'session':session,'cases':cases,'rubric':rubric,'questions':questions,'protectedInstructions':protected},ensure_ascii=False,indent=2)+'\n')
for f in ['casos-ad26.md','instrucciones.md']:
 shutil.copy2(C/f,O/f)
print('Assessment Lab: siete casos compilados desde Markdown; rúbrica y asignaciones incorporadas.')
