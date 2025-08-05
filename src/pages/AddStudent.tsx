import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, UserPlus, ArrowLeft, Check, AlertCircle, Calendar, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    birthDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      birthDate: ""
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validate phone
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Formato: (11) 99999-8888";
    }

    // Validate birth date
    if (!formData.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    } else {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 5 || currentYear - birthYear > 100) {
        newErrors.birthDate = "Idade deve estar entre 5 e 100 anos";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    handleInputChange('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/students');
    }, 1500);
  };

  const getInputClassName = (field: string) => {
    const hasError = errors[field as keyof typeof errors];
    const hasValue = formData[field as keyof typeof formData];
    
    return `transition-all duration-200 ${
      hasError 
        ? 'border-destructive focus:border-destructive ring-destructive/20' 
        : hasValue 
          ? 'border-success focus:border-success ring-success/20'
          : 'border-input focus:border-primary ring-primary/20'
    }`;
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
              <span className="text-muted-foreground">Cadastro de Aluno</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
          <span>/</span>
          <Link to="/students" className="hover:text-primary transition-colors">Alunos</Link>
          <span>/</span>
          <span className="text-foreground">Novo Aluno</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link to="/students" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Cadastrar Novo Aluno</h2>
            <p className="text-muted-foreground">Preencha os dados para cadastrar um novo aluno</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="sport-card shadow-elevated">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <UserPlus className="h-6 w-6 text-primary" />
              <span>Dados do Aluno</span>
            </CardTitle>
            <CardDescription className="text-base">
              Preencha todas as informações obrigatórias para completar o cadastro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Nome Completo *</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite o nome completo do aluno"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={getInputClassName('name')}
                />
                {errors.name && (
                  <div className="flex items-center space-x-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
                {formData.name && !errors.name && (
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <Check className="h-4 w-4" />
                    <span>Nome válido</span>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Telefone *</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-8888"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={getInputClassName('phone')}
                  maxLength={15}
                />
                {errors.phone && (
                  <div className="flex items-center space-x-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
                {formData.phone && !errors.phone && (
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <Check className="h-4 w-4" />
                    <span>Telefone válido</span>
                  </div>
                )}
              </div>

              {/* Birth Date Field */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-semibold flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Data de Nascimento *</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className={getInputClassName('birthDate')}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.birthDate && (
                  <div className="flex items-center space-x-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.birthDate}</span>
                  </div>
                )}
                {formData.birthDate && !errors.birthDate && (
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <Check className="h-4 w-4" />
                    <span>Data válida</span>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 sport-btn-primary text-base font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Check className="h-5 w-5" />
                      <span>Salvar Aluno</span>
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="flex-1 h-12 text-base font-semibold"
                  disabled={isSubmitting}
                >
                  <Link to="/students" className="flex items-center space-x-2">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Cancelar</span>
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-6 sport-card bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Dicas de Preenchimento</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• O nome deve ser completo (nome e sobrenome)</li>
                  <li>• O telefone deve seguir o formato (11) 99999-8888</li>
                  <li>• A data de nascimento é usada para calcular a idade do aluno</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStudent;