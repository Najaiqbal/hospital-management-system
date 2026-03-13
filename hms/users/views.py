from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
from doctors.models import Doctor
from patients.models import Patient


class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:

            # Doctor login
            if Doctor.objects.filter(user=user).exists():

                doctor = Doctor.objects.get(user=user)

                return Response({
                    "user_id": user.id,
                    "doctor_id": doctor.id,
                    "role": "doctor"
                })

            # Patient login
            elif Patient.objects.filter(user=user).exists():

                patient = Patient.objects.get(user=user)

                return Response({
                    "user_id": user.id,
                    "patient_id": patient.id,
                    "role": "patient"
                })

            # Admin login
            elif user.is_staff:

                return Response({
                    "user_id": user.id,
                    "role": "admin"
                })

        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_400_BAD_REQUEST
        )