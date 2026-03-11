from rest_framework import generics
from .models import Appointment
from .serializers import AppointmentSerializer
from patients.models import Patient


# LIST + CREATE APPOINTMENT
class AppointmentListCreateView(generics.ListCreateAPIView):

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):

        patient_id = self.request.data.get("patient")

        patient = Patient.objects.get(id=patient_id)

        serializer.save(patient=patient)


# RETRIEVE / UPDATE / DELETE APPOINTMENT
class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer