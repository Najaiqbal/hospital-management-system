from rest_framework import serializers
from django.contrib.auth.models import User
from doctors.models import Doctor
from patients.models import Patient
import random


class RegisterSerializer(serializers.Serializer):

    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    role = serializers.CharField()

    aadhar = serializers.CharField(required=False, allow_blank=True)
    specialization = serializers.CharField(required=False, allow_blank=True)
    experience = serializers.IntegerField(required=False)
    phone = serializers.CharField(required=False, allow_blank=True)

    age = serializers.IntegerField(required=False)
    gender = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    disease = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):

        role = validated_data.get("role")

        user = User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=validated_data.get("password")
        )

        if role == "doctor":

            Doctor.objects.create(
                user=user,
                doctor_id="DOC" + str(random.randint(1000, 9999)),
                aadhar=validated_data.get("aadhar"),
                specialization=validated_data.get("specialization"),
                phone=validated_data.get("phone"),
                experience=validated_data.get("experience", 0)
            )

        elif role == "patient":

            Patient.objects.create(
                user=user,
                patient_id="PAT" + str(random.randint(1000, 9999)),
                age=validated_data.get("age", 0),
                gender=validated_data.get("gender"),
                address=validated_data.get("address"),
                disease=validated_data.get("disease"),
                phone=validated_data.get("phone")
            )

        return user