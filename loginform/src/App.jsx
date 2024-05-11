import Button from "./components/Button"
import Input from "./components/Input"
import Nav from "./components/Nav"

function App() {
  return (
    <>
    <main className="flex justify-center items-center bg-[url('https://ucarecdn.com/44833637-b401-4a0b-811c-34bfc6b32689/')]
     bg-cover bg-center">
      <div className="flex flex-col gap-4 p-4 h-screen w-screen min-[520px]:w-[520px] items-center">
        <header className="p-2 flex flex-wrap flex-row justify-center gap-2">
          <Nav>Home</Nav>
          <Nav>Services</Nav>
          <Nav>Products</Nav>
          <Nav>Contact Us</Nav>
        </header>
        <div className="text-6xl">Login&nbsp;Form</div>
          <img className="border-[10px] border-white rounded-full size-[200px] my-10"
               src="https://ucarecdn.com/3bc63ffc-1d6b-4944-bd98-befd7d18f434/"
               alt="Login sample profile picture" />
          <Input name="Username" type="text"/>
          <Input name="Password" type="password"/>
        <Button>Login</Button>
        <label>
          <input type="checkbox" />
          <span className="font-bold m-[10px]">Remember&nbsp;me</span>
        </label>
        <button className="underline">Forgot&nbsp;Password</button>
        <Button>Cancel</Button>
      </div>
    </main>
    </>
  )
}
export default App
