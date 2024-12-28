"use client"

import { SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { BarChart3, Search, TrendingUp, Wallet, History, PlusCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Menu, X } from 'lucide-react'

// Mock data for featured ICOs
const featuredIcos = [
  { id: 1, name: "MalawiCoin", symbol: "MWC", price: "500", change: "+3.2%", status: "Active" },
  { id: 2, name: "AfriConnect", symbol: "AFC", price: "250", change: "-1.5%", status: "Active" },
  { id: 3, name: "LilongweTech", symbol: "LTK", price: "150", change: "+2.8%", status: "Active" },
  { id: 4, name: "ZombaCrypto", symbol: "ZBC", price: "75", change: "+0.5%", status: "Upcoming" },
  { id: 5, name: "MalawiBlockchain", symbol: "MBK", price: "200", change: "-2.7%", status: "Active" },
]

// Mock data for all ICOs
const allIcos = [
  ...featuredIcos,
  { id: 6, name: "AgriToken", symbol: "AGT", price: "100", change: "+1.3%", status: "Active", marketCap: "MWK 500M", volume: "MWK 50M" },
  { id: 7, name: "EduChain", symbol: "EDC", price: "75", change: "-0.5%", status: "Active", marketCap: "MWK 350M", volume: "MWK 30M" },
  { id: 8, name: "HealthBlock", symbol: "HLB", price: "250", change: "+2.7%", status: "Active", marketCap: "MWK 250M", volume: "MWK 25M" },
  { id: 9, name: "TransportCoin", symbol: "TRC", price: "180", change: "-1.2%", status: "Active", marketCap: "MWK 400M", volume: "MWK 40M" },
  { id: 10, name: "RuralConnect", symbol: "RLC", price: "50", change: "+0.8%", status: "Active", marketCap: "MWK 200M", volume: "MWK 20M" },
]

// Mock data for user portfolio
const userPortfolio = [
  { id: 1, name: "MalawiCoin", symbol: "MWC", amount: 500, value: "MWK 250,000" },
  { id: 2, name: "AfriConnect", symbol: "AFC", amount: 250, value: "MWK 62,500" },
  { id: 3, name: "LilongweTech", symbol: "LTK", amount: 1000, value: "MWK 150,000" },
]

// Mock data for transaction history
const transactionHistory = [
  { id: 1, type: "Buy", coin: "MWC", amount: 200, price: "MWK 500", total: "MWK 100,000", date: "2024-01-15" },
  { id: 2, type: "Sell", coin: "AFC", amount: 100, price: "MWK 250", total: "MWK 25,000", date: "2024-01-10" },
  { id: 3, type: "Buy", coin: "LTK", amount: 500, price: "MWK 150", total: "MWK 75,000", date: "2024-01-05" },
]

// Mock data for ICO market trend
const icoMarketTrend = [
  { date: '2023-01', totalValue: 100, numberOfICOs: 10 },
  { date: '2023-02', totalValue: 120, numberOfICOs: 12 },
  { date: '2023-03', totalValue: 150, numberOfICOs: 15 },
  { date: '2023-04', totalValue: 180, numberOfICOs: 18 },
  { date: '2023-05', totalValue: 220, numberOfICOs: 22 },
  { date: '2023-06', totalValue: 250, numberOfICOs: 25 },
  { date: '2023-07', totalValue: 280, numberOfICOs: 28 },
  { date: '2023-08', totalValue: 320, numberOfICOs: 32 },
  { date: '2023-09', totalValue: 350, numberOfICOs: 35 },
  { date: '2023-10', totalValue: 400, numberOfICOs: 40 },
  { date: '2023-11', totalValue: 450, numberOfICOs: 45 },
  { date: '2023-12', totalValue: 500, numberOfICOs: 50 },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [accountBalance, setAccountBalance] = useState(1000) // Mock account balance
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="px-4 lg:px-32 h-14 flex items-center relative">
      <a className="flex items-center justify-center" href="#">
        <TrendingUp className="h-6 w-6" />
        <span className="ml-2 md:text-lg text-sm font-semibold">ICO Connect</span>
      </a>
      <button
        className="ml-auto md:hidden"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <nav className={`
        ${isMenuOpen ? 'flex' : 'hidden'}
        md:flex flex-col md:flex-row
        absolute md:relative top-14 md:top-0 left-0 right-0
        bg-white md:bg-transparent
        shadow-md md:shadow-none
        items-start md:items-center
        p-4 md:p-0
        md:ml-auto
        gap-4 sm:gap-6
        transition-all duration-300 ease-in-out
        z-50
      `}>
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
            <Button variant="outline" size="sm" className="w-full md:w-auto">
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
          <div className="container lg:px-32 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold my-2 tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  ICO Trading Platform (Prototype)
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  The main features of this platform include buying and selling ICOs, viewing ICO details, and managing your portfolio.
                </p>
                <p className="max-w-[500px] text-gray-400 text-sm/relaxed dark:text-gray-400">
                  <span className="font-normal">Note:</span> This is just a prototype and all the data included is mock data. The product is still in development and is intended for demonstration purposes only.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={icoMarketTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="totalValue" stroke="#8884d8" activeDot={{ r: 8 }} name="Total ICO Value" />
                      <Line type="monotone" dataKey="numberOfICOs" stroke="#82ca9d" name="Number of ICOs" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container lg:px-32 px-4 md:px-6">
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
          <div className="container lg:px-32 px-4 md:px-6">
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
          <div className="container lg:px-32 px-4 md:px-6">
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
          <div className="container lg:px-32 px-4 md:px-6">
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
        <p className="text-xs text-gray-500 dark:text-gray-400"> 2023 ICO Trading Platform. All rights reserved.</p>
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
            <DialogTitle> Price Chart</DialogTitle>
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

