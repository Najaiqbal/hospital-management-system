from django.shortcuts import render

# Create your views here.
# from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer

# List all patients + Create new patient
class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


# Retrieve, Update, Delete patient
class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer