import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Trophy, Plus, Target, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Alunos Cadastrados",
      value: "147",
      description: "+12% em relação ao mês passado",
      icon: Users,
      color: "sport-blue",
      gradient: "gradient-bg-primary"
    },
    {
      title: "Aulas Esta Semana",
      value: "23",
      description: "6 aulas para hoje",
      icon: Calendar,
      color: "sport-green",
      gradient: "gradient-bg-secondary"
    },
    {
      title: "Assinaturas Ativas",
      value: "89",
      description: "+5 novas assinaturas",
      icon: Trophy,
      color: "sport-orange",
      gradient: "gradient-bg-accent"
    }
  ];

  const recentActivities = [
    { student: "Maria Silva", action: "Nova matrícula", time: "2h atrás", type: "success" },
    { student: "João Santos", action: "Aula cancelada", time: "4h atrás", type: "warning" },
    { student: "Ana Costa", action: "Pagamento realizado", time: "6h atrás", type: "success" },
    { student: "Pedro Lima", action: "Aula reagendada", time: "1d atrás", type: "info" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">QuadraGo</h1>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Painel do Professor</span>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/students">Alunos</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo de volta, Professor!
          </h2>
          <p className="text-muted-foreground">
            Aqui está um resumo das suas atividades e estatísticas.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="sport-card hover:scale-105 transition-transform">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.gradient}`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="sport-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Ações Rápidas</span>
              </CardTitle>
              <CardDescription>
                Acesso rápido às principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start sport-btn-primary">
                <Link to="/students/new" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Cadastrar Novo Aluno</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/students" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Ver Todos os Alunos</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Nova Aula
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="sport-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-secondary" />
                <span>Atividades Recentes</span>
              </CardTitle>
              <CardDescription>
                Últimas movimentações da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-success' :
                      activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.student}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;