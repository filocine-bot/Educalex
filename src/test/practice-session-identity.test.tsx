import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {PracticeSessionProvider,usePracticeSession} from '@/components/practice-session';
const mocks=vi.hoisted(()=>({user:{id:'A'} as {id:string}|null,save:vi.fn()}));
vi.mock('@/components/account-session',()=>({useAccount:()=>({user:mocks.user})}));
vi.mock('@/lib/learning.functions',()=>({saveAttempt:(input:unknown)=>mocks.save(input)}));
function Probe(){const session=usePracticeSession();return <><button onClick={()=>session.addResult({profile:'rector',answers:Array(40).fill(null),elapsedSeconds:1,timedOut:false})}>Deliver</button><button onClick={session.clearResults}>Clear</button><output data-testid="message">{session.saveMessage}</output><output data-testid="count">{session.results.length}</output></>;}
afterEach(()=>{cleanup();vi.clearAllMocks();mocks.user={id:'A'};});
describe('Respuestas tardías de guardado (sin cuentas reales)',()=>{
 it('un guardado de A no confirma éxito en la sesión de B',async()=>{
  let resolve:()=>void=()=>{};mocks.save.mockReturnValue(new Promise<void>(r=>{resolve=r;}));const client=new QueryClient();const tree=()=> <QueryClientProvider client={client}><PracticeSessionProvider><Probe/></PracticeSessionProvider></QueryClientProvider>;
  const view=render(tree());fireEvent.click(screen.getByText('Deliver'));mocks.user={id:'B'};view.rerender(tree());await act(async()=>resolve());expect(screen.getByTestId('message').textContent).toBe('');expect(screen.getByTestId('count').textContent).toBe('0');
 });
 it('borrar resultados temporales invalida el mensaje de un guardado pendiente',async()=>{
  let resolve:()=>void=()=>{};mocks.save.mockReturnValue(new Promise<void>(r=>{resolve=r;}));render(<QueryClientProvider client={new QueryClient()}><PracticeSessionProvider><Probe/></PracticeSessionProvider></QueryClientProvider>);fireEvent.click(screen.getByText('Deliver'));fireEvent.click(screen.getByText('Clear'));await act(async()=>resolve());expect(screen.getByTestId('message').textContent).toBe('');expect(screen.getByTestId('count').textContent).toBe('0');
 });
});