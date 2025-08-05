import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Plus, Edit, Trash2, Target, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: 1,
      name: "Maria Silva Santos",
      phone: "(11) 99999-8888",
      birthDate: "1995-03-15",
      age: 28,
      status: "Ativo"
    },
    {
      id: 2,
      name: "João Pedro Oliveira",
      phone: "(11) 88888-7777",
      birthDate: "1990-07-22",
      age: 33,
      status: "Ativo"
    },
    {
      id: 3,
      name: "Ana Costa Ferreira",
      phone: "(11) 77777-6666",
      birthDate: "1998-11-08",
      age: 25,
      status: "Ativo"
    },
    {
      id: 4,
      name: "Pedro Lima da Silva",
      phone: "(11) 66666-5555",
      birthDate: "1992-01-30",
      age: 31,
      status: "Inativo"
    },
    {
      id: 5,
      name: "Carla Mendes Souza",
      phone: "(11) 55555-4444",
      birthDate: "1997-05-12",
      age: 26,
      status: "Ativo"
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">QuadraGo</h1>
              </Link>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Gestão de Alunos</span>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">Dashboard</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/students">Alunos</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Meus Alunos
            </h2>
            <p className="text-muted-foreground">
              Gerencie todos os seus alunos cadastrados
            </p>
          </div>
          <Button asChild className="sport-btn-primary">
            <Link to="/students/new" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Novo Aluno</span>
            </Link>
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="sport-card">
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total de Alunos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="sport-card">
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-success mr-4" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {students.filter(s => s.status === 'Ativo').length}
                </p>
                <p className="text-sm text-muted-foreground">Alunos Ativos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="sport-card">
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-accent mr-4" />
              <div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Aulas Esta Semana</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="sport-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Buscar Alunos</span>
            </CardTitle>
            <CardDescription>
              Digite o nome do aluno para filtrar a lista
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="sport-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Lista de Alunos</span>
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {filteredStudents.length} aluno(s) encontrado(s)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Nome</TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>Telefone</span>
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Data Nascimento</span>
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-muted-foreground">{student.phone}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(student.birthDate)} ({student.age} anos)
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === 'Ativo' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? 'Nenhum aluno encontrado com esse nome.' : 'Nenhum aluno cadastrado ainda.'}
                </p>
                <Button asChild className="mt-4 sport-btn-primary">
                  <Link to="/students/new">Cadastrar Primeiro Aluno</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button asChild size="lg" className="rounded-full h-14 w-14 shadow-elevated sport-btn-accent">
          <Link to="/students/new">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Students;