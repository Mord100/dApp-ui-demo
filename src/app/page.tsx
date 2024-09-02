"use client"

import { SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { BarChart3, Search, TrendingUp, Wallet, History, PlusCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for featured ICOs
const featuredIcos = [
  { id: 1, name: "DefiChain", symbol: "DFI", price: "1.20", change: "+5.2%", status: "Active" },
  { id: 2, name: "Polkadot", symbol: "DOT", price: "7.80", change: "-2.1%", status: "Active" },
  { id: 3, name: "Cardano", symbol: "ADA", price: "0.50", change: "+1.8%", status: "Active" },
  { id: 4, name: "Ethereum 2.0", symbol: "ETH2", price: "1800", change: "+0.5%", status: "Upcoming" },
  { id: 5, name: "Filecoin", symbol: "FIL", price: "5.60", change: "-3.7%", status: "Active" },
]

// Mock data for all ICOs
const allIcos = [
  ...featuredIcos,
  { id: 6, name: "Chainlink", symbol: "LINK", price: "6.70", change: "+2.3%", status: "Active", marketCap: "$3.4B", volume: "$245M" },
  { id: 7, name: "Uniswap", symbol: "UNI", price: "5.20", change: "-1.5%", status: "Active", marketCap: "$2.6B", volume: "$180M" },
  { id: 8, name: "Aave", symbol: "AAVE", price: "60.40", change: "+3.7%", status: "Active", marketCap: "$850M", volume: "$95M" },
  { id: 9, name: "Cosmos", symbol: "ATOM", price: "8.90", change: "-0.8%", status: "Active", marketCap: "$2.1B", volume: "$130M" },
  { id: 10, name: "Algorand", symbol: "ALGO", price: "0.11", change: "+1.2%", status: "Active", marketCap: "$780M", volume: "$55M" },
]

// Mock data for user portfolio
const userPortfolio = [
  { id: 1, name: "DefiChain", symbol: "DFI", amount: 1000, value: "$1200" },
  { id: 2, name: "Polkadot", symbol: "DOT", amount: 500, value: "$3900" },
  { id: 3, name: "Cardano", symbol: "ADA", amount: 10000, value: "$5000" },
]

// Mock data for transaction history
const transactionHistory = [
  { id: 1, type: "Buy", coin: "DFI", amount: 500, price: "$1.15", total: "$575", date: "2023-06-01" },
  { id: 2, type: "Sell", coin: "DOT", amount: 100, price: "$7.90", total: "$790", date: "2023-05-28" },
  { id: 3, type: "Buy", coin: "ADA", amount: 5000, price: "$0.48", total: "$2400", date: "2023-05-25" },
]

// Generate price history data
const generatePriceHistory = (initialPrice: string, days = 30) => {
  const data = []
  let price = parseFloat(initialPrice)
  for (let i = days; i > 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const change = (Math.random() - 0.5) * 0.1 // Random price change between -5% and 5%
    price *= (1 + change)
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    })
  }
  return data
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [accountBalance, setAccountBalance] = useState(10000) // Mock account balance
  const [selectedICO, setSelectedICO] = useState(null)
  const [showChart, setShowChart] = useState(false)

  const filteredIcos = allIcos.filter(ico => 
    ico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ico.symbol.toLowerCase().includes(searchTerm.toLowerCase()) 
  )

  const handleWithdraw = (amount: number) => {
    if (amount <= accountBalance) {
      setAccountBalance(prevBalance => prevBalance - amount)
      alert(`Successfully withdrawn $${amount}`)
    } else {
      alert("Insufficient funds")
    }
  }
  const handleViewChart = (ico: any) => {
    setSelectedICO(ico)
    setShowChart(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-20 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <TrendingUp className="h-6 w-6" />
          <span className="ml-2 md:text-lg text-sm font-semibold">ICO Connect</span>
        </a>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Home
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            ICOs
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Portfolio
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                List an ICO
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>List a New ICO</DialogTitle>
                <DialogDescription>
                  Provide the details of the new ICO you want to list on our platform.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="symbol" className="text-right">
                    Symbol
                  </Label>
                  <Input id="symbol" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Initial Price
                  </Label>
                  <Input id="price" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit for Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container lg:px-20 px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              ICO Trading Platform
            </h1>
            <p className=" max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover, trade, and manage the latest blockchain Initial Coin Offerings (ICOs)
            </p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container lg:px-20 px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Featured ICOs</h2>
              <div className="flex items-center space-x-4">
                <Wallet className="h-6 w-6" />
                <span className="font-semibold">Balance: ${accountBalance.toFixed(2)}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Withdraw</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount you wish to withdraw from your account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Amount
                        </Label>
                        <Input id="amount" className="col-span-3" type="number" placeholder="Enter amount" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleWithdraw(100)}>Withdraw</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 mb-6">
              <Search className="text-gray-500" />
              <Input
                className="flex-1"
                placeholder="Search ICOs..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All ICOs</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredIcos.filter(ico => 
                  ico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  ico.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((ico) => (
                  <Card key={ico.id}>
                    <CardHeader>
                      <CardTitle>{ico.name}</CardTitle>
                      <CardDescription>{ico.symbol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">${ico.price}</span>
                        <span className={`text-sm ${ico.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {ico.change}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">Status: {ico.status}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleViewChart(ico)}>View Chart</Button>
                      <Button>Trade</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="active" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredIcos.filter(ico => ico.status === "Active" && (
                  ico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  ico.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                )).map((ico) => (
                  <Card key={ico.id}>
                    <CardHeader>
                      <CardTitle>{ico.name}</CardTitle>
                      <CardDescription>{ico.symbol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">${ico.price}</span>
                        <span className={`text-sm ${ico.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {ico.change}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">Status: {ico.status}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleViewChart(ico)}>View Chart</Button>
                      <Button>Trade</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="upcoming" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredIcos.filter(ico => ico.status === "Upcoming" && (
                  ico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  ico.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                )).map((ico) => (
                  <Card key={ico.id}>
                    <CardHeader>
                      <CardTitle>{ico.name}</CardTitle>
                      <CardDescription>{ico.symbol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">${ico.price}</span>
                        <span className={`text-sm ${ico.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {ico.change}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">Status: {ico.status}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleViewChart(ico)}>View Chart</Button>
                      <Button>Notify Me</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container lg:px-20 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">All Available ICOs</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>Volume (24h)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIcos.map((ico) => (
                    <TableRow key={ico.id}>
                      <TableCell className="font-medium">{ico.name}</TableCell>
                      <TableCell>{ico.symbol}</TableCell>
                      <TableCell>${ico.price}</TableCell>
                      <TableCell className={ico.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {ico.change}
                      </TableCell>
                      <TableCell>{(ico as any).marketCap}</TableCell>
                      <TableCell>{(ico as any).volume}</TableCell>

                      <TableCell>{ico.status}</TableCell>
                      <TableCell>
                        <Button size="sm" variant={"outline"} className="mr-2" onClick={() => handleViewChart(ico)}>View Chart</Button>
                        <Button size="sm">Trade</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container lg:px-20 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">Your Portfolio</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userPortfolio.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.symbol}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span>Amount: {item.amount}</span>
                      <span className="font-bold">Value: {item.value}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Trade</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container lg:px-20 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">Transaction History</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Coin</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.coin}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.price}</TableCell>
                      <TableCell>{transaction.total}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 ICO Trading Platform. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
      <Dialog open={showChart} onOpenChange={setShowChart}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>{(selectedICO as any).name} ({(selectedICO as any).symbol}) Price Chart</DialogTitle>
          </DialogHeader>
          {selectedICO && (
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generatePriceHistory((selectedICO as any).price)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowChart(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}