from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Patient
        fields = [
            "id",
            "name",
            "age",
            "gender",
            "address",
            "phone"
        ]