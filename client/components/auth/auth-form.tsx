"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { loginSchema, signUpSchema, type LoginValues, type SignUpValues } from "@/app/auth/schema/auth"
import { signin, signup } from "@/app/auth/api"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

interface AuthFormProps {
  type: "signin" | "signup"
  userType: "user" | "service_provider"
}

export function AuthForm({ type, userType }: AuthFormProps) {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const schema = type === "signin" ? loginSchema : signUpSchema
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: type === "signin"
      ? { email: "", password: "", registrationType: userType }
      : { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", registrationType: userType, phoneNumber: "" },
  })
  console.log(form.getValues())

  async function onSubmit(values: any) {
    try {
      let response;
      if (type === "signin") {
        response = await signin({
          ...values,
        });
      } else {
        response = await signup({
          ...values
        });
      }

      if (response) {
        // Assume API returns user data correctly on successful auth
        setUser(response.user || response);
        // Redirect to dashboard or home after successful login/signup
        router.push(userType === "user" ? "/consumers" : "/service-provider");
      }
    } catch (error: any) {
      console.error(`${type} error:`, error.response?.data?.message || error.message);
      // Here you could set form errors or show a toast
    }
  }

  const title = type === "signin" ? "Sign In" : "Create an Account"
  const description = userType === "service_provider"
    ? "Join as a Service Provider to find work"
    : "Join as a Customer to find services"

  const oppositeType = type === "signin" ? "signup" : "signin"
  const footerText = type === "signin"
    ? "Don't have an account?"
    : "Already have an account?"
  const footerLinkText = type === "signin" ? "Sign Up" : "Sign In"
  const footerLink = `/auth/${userType}/${oppositeType}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-950/90 border-slate-200 dark:border-slate-800 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (data) => console.log(data))} className="space-y-4">
              {type === "signup" && (
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type === "signup" && (
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "signup" && <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "signup" && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                {type === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            {footerText}{" "}
            <Link href={footerLink} className="text-blue-600 hover:underline font-medium">
              {footerLinkText}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
