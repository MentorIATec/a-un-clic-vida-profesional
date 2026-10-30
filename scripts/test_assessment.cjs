const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=JSON.parse(read('docs/assessment-lab/data.json')),source=read('docs/assessment-lab/lab.js'),html=read('docs/assessment-lab/index.html');
const nodes={'#main':{focus(){}},'#report':{},'#notice':{},'#copy-team':{},'#copy-text':{focus(){this.focused=true},select(){this.selected=true}},'#manual-copy':{open:false}};
const ctx=vm.createContext({console,URL,setTimeout,clearTimeout,document:{querySelector:s=>nodes[s],querySelectorAll:()=>[]},window:{scrollTo(){}},location:{hash:''}});
vm.runInContext(source.slice(0,source.indexOf("window.addEventListener('hashchange'")),ctx);vm.runInContext(`D=${JSON.stringify(data)}`,ctx);
const run=e=>vm.runInContext(e,ctx);
assert.equal(data.session.assignments.reduce((n,a)=>n+a.members,0),28);
assert.deepEqual(data.session.assignments.map(a=>a.caseId),['nova','flexa','devicelink','biolinea','sitepulse','rutapiloto','nexocomercial']);
assert.deepEqual(data.rubric,JSON.parse(read('content/assessment-lab/rubrica.json')));
for(const a of data.session.assignments){
 const c=data.cases.find(c=>c.id===a.caseId);const text=run(`collaborativeText(caseForTeam(${a.team}))`);
 for(const t of [...c.context,c.task,c.pressure,c.audience,...data.questions.map(q=>q.title)])assert(text.includes(t));
 assert(text.includes('Integrante 4'));assert(!text.includes('Integrante 5'));
 for(const hash of [`#equipo/${a.team}`,`#caso/${c.id}`]){ctx.location.hash=hash;run('render()');assert(nodes['#main'].innerHTML.includes(c.title));assert(nodes['#copy-text'].value.includes(c.title));assert(!nodes['#main'].innerHTML.includes('<form'));}
}
for(const forbidden of ['team-form','team-preview','showReport','beforeunload','state.teams','data-field=','Guardar como PDF','Trabajo del equipo'])assert(!(source+html).includes(forbidden),forbidden);
assert(source.includes('textarea id="copy-text" readonly'));assert(run(`caseView({...caseForTeam(1),title:'<script>'})`).includes('&lt;script&gt;'));
(async()=>{
 let copied='';ctx.navigator={clipboard:{writeText:async t=>{copied=t}}};run('bindCopy(caseForTeam(7))');await nodes['#copy-team'].onclick();assert.equal(copied,run('collaborativeText(caseForTeam(7))'));assert(copied.includes('NexoComercial'));
 ctx.navigator.clipboard.writeText=async()=>{throw Error('denied')};await nodes['#copy-team'].onclick();assert(nodes['#manual-copy'].open);assert(nodes['#copy-text'].selected);assert.equal(nodes['#copy-text'].value,copied);run('clearTimeout(timer)');
 console.log('OK: seven cases, 28 places, legacy links, complete templates, clipboard and manual fallback, no response capture, escaping, unchanged rubric.');
})().catch(e=>{console.error(e);process.exitCode=1});

assert(run('bank()').includes('Abrir formulario de coevaluación'));
assert(run('caseView(caseForTeam(7))').includes('Valora a los otros seis equipos, al tuyo no.'));
assert(run('coevaluation()').includes('1FAIpQLSehy9F0E_Z835ovZP8fnXZaYFMoR0L-uIC1f5MDCgFDNZzArw/viewform'));
assert(run('coevaluation()').includes('rel="noopener noreferrer"'));

for(const a of data.session.assignments)assert(run(`collaborativeText(caseForTeam(${a.team}))`).includes('Liga a la presentación o apoyo visual: [Pegar URL completa]'));

for(const a of data.session.assignments){
 const text=run(`collaborativeText(caseForTeam(${a.team}))`),view=run(`caseView(caseForTeam(${a.team}))`);
 assert(!text.includes(' · '));assert(!text.includes('versión'));assert(!text.includes('Caso: '+a.caseId));
 assert(text.startsWith('ASSESSMENT AD26\n\nEquipo '+a.team));
 assert(view.indexOf('class="reading"')<view.indexOf('id="copy-team"'));
 assert(view.indexOf('class="reading"')<view.indexOf('aria-label="Coevaluación'));
}
assert(!run('bank()').includes('y plantilla'));
assert(run('copyUI()').includes('>Copiar caso</button>'));
