/*
 * Environment Variables Checker Page
 * 
 * This page displays all environment variables needed for the application
 * and their current status. When AI adds new env variables to the codebase,
 * it should automatically update the ENV_VARIABLES array in lib/env-config.ts.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';
import { ENV_VARIABLES } from '@/lib/env-config';

export default function EnvCheckPage() {
  // Check environment variables on server side
  const envStatus: { [key: string]: boolean } = {};
  ENV_VARIABLES.forEach((envVar) => {
    envStatus[envVar.name] = !!process.env[envVar.name];
  });

  const getStatusIcon = (isSet: boolean) => {
    if (isSet) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (isSet: boolean) => {
    if (isSet) {
      return <Badge variant="default" className="bg-green-500">Set</Badge>;
    } else {
      return <Badge variant="destructive">Missing</Badge>;
    }
  };

  const missingCount = ENV_VARIABLES.filter(env => !envStatus[env.name]).length;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Environment Variables Status</h1>
        <p className="text-muted-foreground">
          This page shows all environment variables needed for the application and their current status.
        </p>
      </div>

      {missingCount > 0 && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>{missingCount} environment variable{missingCount > 1 ? 's are' : ' is'} missing.</strong>
            {' '}The application may not function correctly without them.
          </AlertDescription>
        </Alert>
      )}

      {missingCount === 0 && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>All environment variables are properly configured!</strong>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {ENV_VARIABLES.map((envVar) => {
          const isSet = envStatus[envVar.name];
          return (
            <Card key={envVar.name} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono">{envVar.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(isSet)}
                    {getStatusBadge(isSet)}
                  </div>
                </div>
                <CardDescription>{envVar.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">How to get this variable:</h4>
                    <div 
                      className="text-sm text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: envVar.instructions
                          .replace(/\n/g, '<br>')
                          .replace(
                            /\[([^\]]+)\]\(([^)]+)\)/g,
                            '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
                          )
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}